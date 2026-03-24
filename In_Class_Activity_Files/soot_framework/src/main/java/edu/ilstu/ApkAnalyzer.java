package edu.ilstu;

import soot.*;
import soot.jimple.*;
import soot.options.Options;
import soot.util.Chain;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.*;

/**
 * IT 359 – Tools and Techniques in Penetration Testing
 * Illinois State University
 *
 * Soot-based APK Analyzer
 *
 * Performs static analysis on an Android APK using the Soot framework:
 *   - Lists all classes and methods (call graph overview)
 *   - Detects potentially sensitive API calls (crypto, network, SMS, reflection)
 *   - Extracts string constants from method bodies
 *   - Dumps Jimple IR for every method to an output directory
 *
 * Usage (after building with Maven):
 *   java -jar target/soot-apk-analyzer.jar <path/to/app.apk> [android-platforms-dir] [output-dir]
 *
 * Arguments:
 *   apk-path            Path to the target APK file (required)
 *   android-platforms   Path to the Android SDK platforms directory
 *                       (default: $ANDROID_HOME/platforms or ~/android-sdk/platforms)
 *   output-dir          Directory where Jimple IR and reports are written
 *                       (default: ./soot_output)
 */
public class ApkAnalyzer {

    // -----------------------------------------------------------------------
    // Sensitive API signatures to flag during analysis
    // -----------------------------------------------------------------------
    private static final Map<String, String> SENSITIVE_APIS = new LinkedHashMap<>();

    static {
        // Cryptography
        SENSITIVE_APIS.put("<javax.crypto.Cipher: javax.crypto.Cipher getInstance(java.lang.String)>",
                "Crypto – Cipher.getInstance (check for weak algorithms like DES/ECB)");
        SENSITIVE_APIS.put("<javax.crypto.KeyGenerator: javax.crypto.KeyGenerator getInstance(java.lang.String)>",
                "Crypto – KeyGenerator.getInstance");
        SENSITIVE_APIS.put("<java.security.MessageDigest: java.security.MessageDigest getInstance(java.lang.String)>",
                "Crypto – MessageDigest.getInstance (check for MD5/SHA-1)");
        SENSITIVE_APIS.put("<javax.crypto.spec.SecretKeySpec: void <init>(byte[],java.lang.String)>",
                "Crypto – Hardcoded key risk via SecretKeySpec");

        // Networking
        SENSITIVE_APIS.put("<java.net.URL: void <init>(java.lang.String)>",
                "Network – URL constructor (check for hardcoded endpoints)");
        SENSITIVE_APIS.put("<okhttp3.OkHttpClient: okhttp3.OkHttpClient$Builder newBuilder()>",
                "Network – OkHttp client creation");
        SENSITIVE_APIS.put("<android.webkit.WebView: void loadUrl(java.lang.String)>",
                "Network – WebView.loadUrl (possible XSS / open redirect)");

        // SMS / telephony
        SENSITIVE_APIS.put("<android.telephony.SmsManager: void sendTextMessage(java.lang.String,java.lang.String,java.lang.String,android.app.PendingIntent,android.app.PendingIntent)>",
                "Telephony – SMS send (potential premium-rate / exfil)");
        SENSITIVE_APIS.put("<android.telephony.TelephonyManager: java.lang.String getDeviceId()>",
                "Telephony – getDeviceId (IMEI collection)");

        // Reflection
        SENSITIVE_APIS.put("<java.lang.reflect.Method: java.lang.Object invoke(java.lang.Object,java.lang.Object[])>",
                "Reflection – Method.invoke (dynamic dispatch, obfuscation indicator)");
        SENSITIVE_APIS.put("<java.lang.Class: java.lang.Class forName(java.lang.String)>",
                "Reflection – Class.forName (dynamic class loading)");

        // File / shared prefs
        SENSITIVE_APIS.put("<android.content.Context: android.content.SharedPreferences getSharedPreferences(java.lang.String,int)>",
                "Storage – SharedPreferences access");
        SENSITIVE_APIS.put("<java.io.FileOutputStream: void <init>(java.lang.String)>",
                "Storage – FileOutputStream (writing to disk)");

        // Native code
        SENSITIVE_APIS.put("<java.lang.System: void loadLibrary(java.lang.String)>",
                "Native – System.loadLibrary (native .so loaded)");

        // Runtime exec
        SENSITIVE_APIS.put("<java.lang.Runtime: java.lang.Process exec(java.lang.String)>",
                "Exec – Runtime.exec (command execution risk)");
        SENSITIVE_APIS.put("<java.lang.Runtime: java.lang.Process exec(java.lang.String[])>",
                "Exec – Runtime.exec (command execution risk)");
    }

    // -----------------------------------------------------------------------
    // Main
    // -----------------------------------------------------------------------
    public static void main(String[] args) throws IOException {
        if (args.length < 1) {
            printUsage();
            System.exit(1);
        }

        String apkPath       = args[0];
        String platformsPath = args.length > 1 ? args[1] : resolveAndroidPlatforms();
        String outputDir     = args.length > 2 ? args[2] : "soot_output";

        File apkFile = new File(apkPath);
        if (!apkFile.exists() || !apkFile.isFile()) {
            System.err.println("[!] APK not found: " + apkPath);
            System.exit(1);
        }

        if (platformsPath == null) {
            System.err.println("[!] Android platforms directory not found.");
            System.err.println("    Set ANDROID_HOME or pass the path as the second argument.");
            System.err.println("    Example: ~/android-sdk/platforms");
            System.exit(1);
        }

        System.out.println("=================================================");
        System.out.println("  Soot APK Analyzer – IT 359, Illinois State");
        System.out.println("=================================================");
        System.out.println("[*] APK          : " + apkFile.getAbsolutePath());
        System.out.println("[*] Platforms    : " + platformsPath);
        System.out.println("[*] Output dir   : " + outputDir);
        System.out.println();

        new File(outputDir).mkdirs();

        configureSoot(apkFile.getAbsolutePath(), platformsPath, outputDir);
        Scene.v().loadNecessaryClasses();

        System.out.println("[*] Soot scene loaded. Running analysis...\n");

        ApkAnalyzer analyzer = new ApkAnalyzer();
        analyzer.analyze(outputDir);
    }

    // -----------------------------------------------------------------------
    // Soot configuration
    // -----------------------------------------------------------------------
    private static void configureSoot(String apkPath, String platformsPath, String outputDir) {
        G.reset();

        Options opts = Options.v();
        opts.set_process_dir(Collections.singletonList(apkPath));
        opts.set_android_jars(platformsPath);
        opts.set_src_prec(Options.src_prec_apk);
        opts.set_output_format(Options.output_format_jimple);
        opts.set_output_dir(outputDir + "/jimple");
        opts.set_whole_program(true);
        opts.set_allow_phantom_refs(true);
        opts.set_no_writeout_body_releasing(true);
        opts.set_keep_line_number(true);
        opts.set_throw_analysis(Options.throw_analysis_pedantic);
        opts.set_ignore_resolution_errors(true);

        // Force loading of all application classes
        opts.set_force_overwrite(true);
        opts.set_prepend_classpath(true);

        Scene.v().addBasicClass("java.lang.Object");
    }

    // -----------------------------------------------------------------------
    // Core analysis
    // -----------------------------------------------------------------------
    public void analyze(String outputDir) throws IOException {
        // Write out Jimple IR for all classes
        new File(outputDir + "/jimple").mkdirs();

        Chain<SootClass> classes = Scene.v().getApplicationClasses();

        System.out.printf("[*] Application classes found: %d%n%n", classes.size());

        // Accumulators
        List<String> classReport       = new ArrayList<>();
        List<String> sensitiveFindings = new ArrayList<>();
        List<String> stringFindings    = new ArrayList<>();
        List<String> jimpleOutput      = new ArrayList<>();

        int methodCount = 0;

        for (SootClass sc : classes) {
            if (sc.isPhantom()) continue;

            classReport.add("CLASS: " + sc.getName()
                    + "  [" + (sc.isInterface() ? "interface" : "class") + "]");

            for (SootMethod sm : sc.getMethods()) {
                methodCount++;
                classReport.add("  METHOD: " + sm.getSubSignature());

                if (!sm.isConcrete()) continue;

                Body body;
                try {
                    body = sm.retrieveActiveBody();
                } catch (Exception e) {
                    // Phantom or unresolvable body – skip
                    continue;
                }

                boolean hasSensitiveApi = false;

                // Scan each statement
                for (Unit unit : body.getUnits()) {
                    Stmt stmt = (Stmt) unit;

                    // --- Sensitive API detection ---
                    if (stmt.containsInvokeExpr()) {
                        InvokeExpr invoke = stmt.getInvokeExpr();
                        String sig = invoke.getMethod().getSignature();
                        String desc = SENSITIVE_APIS.get(sig);
                        if (desc != null) {
                            hasSensitiveApi = true;
                            sensitiveFindings.add(String.format(
                                    "[%s]%n  Method : %s%n  Stmt   : %s%n  Note   : %s",
                                    sc.getName(), sm.getSignature(), stmt, desc));
                        }
                    }

                    // --- String constant extraction ---
                    for (ValueBox vb : stmt.getUseBoxes()) {
                        Value v = vb.getValue();
                        if (v instanceof StringConstant) {
                            String s = ((StringConstant) v).value;
                            if (s.length() >= 6) { // filter trivial strings
                                stringFindings.add(String.format(
                                        "[%s | %s]  \"%s\"",
                                        sc.getName(), sm.getName(), s));
                            }
                        }
                    }
                }

                // --- Extract Jimple code for sensitive methods ---
                if (hasSensitiveApi) {
                    jimpleOutput.add("================================================================================");
                    jimpleOutput.add("CLASS: " + sc.getName());
                    jimpleOutput.add("METHOD: " + sm.getSignature());
                    jimpleOutput.add("================================================================================");
                    jimpleOutput.add("");
                    // Add Jimple body
                    for (Unit unit : body.getUnits()) {
                        jimpleOutput.add("    " + unit.toString());
                    }
                    jimpleOutput.add("");
                }
            }
        }

        System.out.printf("[*] Total methods analysed: %d%n", methodCount);
        System.out.printf("[*] Sensitive API hits    : %d%n", sensitiveFindings.size());
        System.out.printf("[*] String constants found: %d%n%n", stringFindings.size());

        // --- Write Jimple IR files for all classes ---
        int jimpleCount = 0;
        for (SootClass sc : classes) {
            if (sc.isPhantom()) continue;
            try {
                String className = sc.getName();
                String filepath = outputDir + "/jimple/" + className.replace(".", "/") + ".jimple";
                new File(filepath).getParentFile().mkdirs();

                try (PrintWriter pw = new PrintWriter(new FileWriter(filepath))) {
                    for (SootMethod sm : sc.getMethods()) {
                        if (!sm.isConcrete()) continue;
                        try {
                            Body body = sm.retrieveActiveBody();
                            pw.println("// ===== Method: " + sm.getSignature() + " =====");
                            for (Unit unit : body.getUnits()) {
                                pw.println(unit.toString());
                            }
                            pw.println();
                        } catch (Exception e) {
                            pw.println("// (could not retrieve body for " + sm.getSignature() + ")");
                        }
                    }
                }
                jimpleCount++;
            } catch (Exception e) {
                System.err.println("[!] Error writing Jimple for " + sc.getName() + ": " + e.getMessage());
            }
        }
        System.out.printf("[*] Jimple files written: %d%n%n", jimpleCount);

        // Write reports
        writeReport(outputDir + "/class_method_map.txt",     classReport,       "CLASS / METHOD MAP");
        writeReport(outputDir + "/sensitive_apis.txt",       sensitiveFindings, "SENSITIVE API CALLS");
        writeReport(outputDir + "/string_constants.txt",     stringFindings,    "STRING CONSTANTS");
        writeReport(outputDir + "/sensitive_apis_jimple.txt", jimpleOutput,      "JIMPLE CODE FOR SENSITIVE API CALLS");

        // Print sensitive findings to console for quick triage
        if (!sensitiveFindings.isEmpty()) {
            System.out.println("=== SENSITIVE API FINDINGS ===");
            sensitiveFindings.forEach(f -> System.out.println(f + "\n"));
        } else {
            System.out.println("[*] No sensitive API calls matched the built-in signatures.");
        }

        System.out.println("\n[+] Reports written to: " + new File(outputDir).getAbsolutePath());
        System.out.println("    - class_method_map.txt");
        System.out.println("    - sensitive_apis.txt");
        System.out.println("    - string_constants.txt");
        System.out.println("    - sensitive_apis_jimple.txt  (Jimple IR with sensitive APIs)");
        System.out.println("    - jimple/  (Jimple IR for each class)");
    }

    // -----------------------------------------------------------------------
    // Helpers
    // -----------------------------------------------------------------------
    private void writeReport(String path, List<String> lines, String title) throws IOException {
        new File(path).getParentFile().mkdirs();
        try (PrintWriter pw = new PrintWriter(new FileWriter(path))) {
            pw.println("=".repeat(60));
            pw.println("  " + title);
            pw.println("=".repeat(60));
            pw.println();
            if (lines.isEmpty()) {
                pw.println("(none)");
            } else {
                lines.forEach(l -> { pw.println(l); pw.println(); });
            }
        }
        System.out.println("[+] Written: " + path);
    }

    private static String resolveAndroidPlatforms() {
        // 1. ANDROID_HOME env var
        String androidHome = System.getenv("ANDROID_HOME");
        if (androidHome != null) {
            String p = androidHome + File.separator + "platforms";
            if (new File(p).isDirectory()) return p;
        }
        // 2. Common default locations
        String[] defaults = {
            System.getProperty("user.home") + "/android-sdk/platforms",
            System.getProperty("user.home") + "/Android/Sdk/platforms",
            "/opt/android-sdk/platforms",
        };
        for (String d : defaults) {
            if (new File(d).isDirectory()) return d;
        }
        return null;
    }

    private static void printUsage() {
        System.err.println("Usage: java -jar soot-apk-analyzer.jar <apk-file> [android-platforms] [output-dir]");
        System.err.println();
        System.err.println("  apk-file          Path to the .apk to analyse (required)");
        System.err.println("  android-platforms Path to Android SDK platforms/ directory");
        System.err.println("                    (auto-detected from ANDROID_HOME if omitted)");
        System.err.println("  output-dir        Where to write reports (default: soot_output)");
    }
}
