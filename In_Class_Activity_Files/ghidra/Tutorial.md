Analyzing an APK on Linux involves a mix of automated scanning, resource extraction, and deep dive reverse engineering. This guide follows a workflow from high-level "black-box" scanning to detailed code analysis.

---

### Phase 1: Initial Triage & Metadata

Before running anything locally, use external intelligence and basic hashing.

#### 1. VirusTotal (Automated Intelligence)

Get the SHA-256 hash of your APK and check if it’s a known threat.

* **Command:** `sha256sum your_app.apk`
* **Action:** Copy the hash and paste it into the **VirusTotal** search bar.
* **What to look for:** Detection ratios, identified malware families (e.g., "Trojan.Android.Agent"), and "Behavior" tabs which show network calls or file system changes observed in sandboxes.

#### 2. pehash (Structural Hashing)

`pehash` (often part of the `totalhash` or specialized malware toolkits) generates a hash based on the structural characteristics of a file. While traditionally for Windows PE files, mobile analysts use it to find similarities between different malware samples.

* **Command:** `pehash your_app.apk`
* **Insight:** If two APKs have different file hashes but identical `pehashes`, they likely share the same structural "DNA" or were created by the same builder.

---

### Phase 2: Resource Extraction & Xamarin Analysis

Now, crack open the APK to see what's inside.

#### 3. Apktool (Decompilation)

Apktool decodes the APK's resources (like images and layouts) and converts the `classes.dex` into readable **Smali** code.

* **Command:** `apktool d your_app.apk -o output_dir`
* **Focus:** * **AndroidManifest.xml:** Check for suspicious permissions (e.g., `READ_SMS`, `RECORD_AUDIO`).
* **res/values/strings.xml:** Look for hardcoded API keys or URLs.



#### 4. pyxamstore (Xamarin Unpacking)

If the app was built with **Xamarin**, the core logic isn't in Java/Smali; it's hidden in `.dll` files inside an "Assembly Store."

* **Check:** Look for `assemblies.blob` in the `assets` or `unknown/assemblies/` folder after using Apktool.
* **Command:** `pyxamstore unpack -d output_dir/unknown/assemblies/`
* **Result:** This will extract `.dll` files. You can then analyze these C# binaries using tools like `dnSpy` (via Wine) or Ghidra.

---

### Phase 3: Binary & String Analysis

Static analysis of the raw binary data.

#### 5. pestring (String Extraction)

`pestring` is a more advanced version of the standard `strings` command. It extracts human-readable text from the binary while trying to filter out noise.

* **Command:** `pestring your_app.apk > strings.txt`
* **Search for:**
* `http://` or `https://` (C2 servers).
* `.php`, `.jsp` (Server-side endpoints).
* IP addresses.
* Shell commands like `chmod` or `mount`.



---

### Phase 4: Deep Reverse Engineering

For when you need to understand the actual logic of a native library or a specific method.

#### 6. Ghidra (Decompilation & Disassembly)

Ghidra is used for analyzing **native libraries** (`.so` files) found in the `lib/` folder of the APK. These are written in C/C++ and often contain the most sensitive or obfuscated code.

* **Workflow:**
1. Open Ghidra and create a new project.
2. Locate a native library in your Apktool output (e.g., `lib/arm64-v8a/libnative-lib.so`).
3. Drag the `.so` file into Ghidra.
4. Run **Auto-Analysis**.
5. **Decompiler Window:** This is your best friend. It will attempt to turn assembly back into readable C code.
6. **Search for:** JNI functions (prefixed with `Java_...`). These are the bridge between the Java code and the native code.



---

### Summary Checklist

| Tool | Purpose |
| --- | --- |
| **VirusTotal** | Quick reputation check and sandbox reports. |
| **pehash** | Identify structural similarities with known malware. |
| **Apktool** | Extract Manifest, Resources, and Smali code. |
| **pyxamstore** | Unpack C# DLLs from Xamarin-based apps. |
| **pestring** | Find hidden URLs, IPs, and suspicious commands. |
| **Ghidra** | Reverse engineer native `.so` libraries. |

