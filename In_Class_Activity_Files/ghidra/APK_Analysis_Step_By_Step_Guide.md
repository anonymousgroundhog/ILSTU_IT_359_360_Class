[Reverse Engineering Mobile Apps: Dissecting Android/iOS Binaries with JADX, Hopper, and Ghidra](https://medium.com/@izaz.haque246/reverse-engineering-mobile-apps-dissecting-android-ios-binaries-with-jadx-hopper-and-ghidra-9698694aee9c)

[Decompile and Recompile APK using APKTOOL :Beginners Guide](https://medium.com/@ps.sujith/decompile-and-recompile-apk-using-apktool-beginners-guide-4ad03c2c5b8f)

# Additional Resources

# Phase 1: Initial Triage

Before touching the file locally, get quick intelligence from public sources.

### Step 1: Hash the APK

```bash
sha256sum base.apk
```

Take the resulting SHA-256 hash and search it on **VirusTotal** ([virustotal.com](http://virustotal.com/)). Look for:

- Detection ratio (e.g., `3/72`) — how many AV engines flag it
- Identified malware family names under the "Detection" tab
- The "Behavior" tab for sandbox-observed network calls and file writes

https://www.virustotal.com/gui/file/4180b360b2e6519e5562b654e968bc5f520977da94cfdefffb08a9096fe7f0d0

## Virus Total

**What is VirusTotal?**

VirusTotal is a free online service that analyzes files and URLs for malicious content. When you upload a file or submit its hash, VirusTotal scans it with dozens of antivirus engines and URL/domain blacklisting services simultaneously.

**Key features:**

- **Multi-engine scanning:** Uses 70+ antivirus scanners and detection tools
- **Hash-based lookups:** You can search by SHA-256, SHA-1, or MD5 hash without uploading the file
- **Behavioral analysis:** Runs files in a sandbox and reports network connections, file system changes, registry modifications, and API calls
- **Community intelligence:** Shows comments, relationships to other files, and crowdsourced threat intelligence
- **Historical data:** Keeps results indefinitely, so you can see when a file was first seen and how detection rates have changed over time

**Privacy note:** Files uploaded to VirusTotal become part of their database and may be shared with security researchers and AV vendors. For sensitive samples, use hash lookups first to see if the file has already been analyzed.

**Link:** https://www.virustotal.com

---

 

### Step 2: Structural Hashing with strings

`strings` generates a hash based on the *structure* of the file rather than its content. 

```bash
strings base.apk
```

Compare this output against known malware databases or other samples you're investigating to detect family relationships.

# Phase 2: Decompile with Apktool

`apktool` is the first real step into the APK. It decodes resources and converts `classes.dex` into human-readable **Smali** bytecode.

## APKTool

**What is Apktool?**

Apktool is a tool for reverse engineering Android APK files. It allows you to decode resources to nearly original form and rebuild them after making modifications.

**Key features:**

- **Resource decoding:** Extracts and decodes resources like XML files, images, and layouts from the APK's binary format back to human-readable form
- **Smali disassembly:** Converts the APK's `classes.dex` (Dalvik bytecode) into Smali code, which is a human-readable assembly language for the Dalvik virtual machine
- **AndroidManifest.xml decoding:** Decodes the binary XML manifest file into readable XML format, revealing permissions, components, and metadata
- **Rebuilding APKs:** After modifications, you can rebuild the APK (though it will need to be re-signed to install on a device)
- **Framework resource handling:** Can install framework resources to properly decode apps that depend on manufacturer-specific or custom Android frameworks

**Installation:**

```bash
# On macOS with Homebrew
brew install apktool

# On Linux (Debian/Ubuntu)
sudo apt install apktool

# Or download the latest jar from:
# https://ibotpeaches.github.io/Apktool/
```

**Basic usage:**

```bash
# Decode/decompile an APK
apktool d app.apk -o output_directory/

# Rebuild an APK after modifications
apktool b output_directory/ -o modified.apk
```

**What Apktool does NOT do:**

- It does not decompile Smali back to Java source code (use `jadx` or `jd-gui` for that)
- It does not unpack Xamarin/Unity assemblies (use `pyxamstore` or `UnityPy` for those)
- It does not analyze native libraries (use Ghidra or IDA Pro for `.so` files)

**Link:** https://ibotpeaches.github.io/Apktool/

---

### Step 3: Decompile the APK

```bash
apktool d base.apk -o ~/Downloads/base/
```

This produces the directory structure already present at `~/Downloads/base/`.

### Step 4: Read the AndroidManifest.xml

- Android manifest
  
    **What is AndroidManifest.xml?**
    
    The AndroidManifest.xml file is a required configuration file in every Android application. It sits at the root of the APK and describes essential information about the app to the Android operating system.
    
    **Key information contained in the manifest:**
    
    - **Package name:** The unique identifier for the app (e.g., `com.example.wicconnect`)
    - **Permissions:** All permissions the app requests from the user (e.g., `CAMERA`, `INTERNET`, `ACCESS_FINE_LOCATION`)
    - **App components:** Declares all activities, services, broadcast receivers, and content providers
    - **Intent filters:** Defines which activities can be launched by external apps or deep links
    - **Minimum SDK version:** Specifies the minimum Android version required to run the app
    - **Metadata:** Hardcoded configuration values like API keys, OAuth client IDs, and feature flags
    - **Hardware/software requirements:** Camera requirements, screen size preferences, etc.
    
    **Why it matters for security analysis:**
    
    - **Permission over-reach:** Does the app request more permissions than its stated purpose requires?
    - **Exposed components:** Activities or services marked `android:exported="true"` can be triggered by other apps, potentially exposing attack surface
    - **Hardcoded secrets:** API keys, OAuth tokens, or server URLs embedded directly in `&lt;meta-data&gt;` tags
    - **Deep link handlers:** Custom URL schemes (e.g., `miwic://`) that could be exploited for phishing or session hijacking
    - **Debug flags:** `android:debuggable="true"` in production builds is a major security red flag
    
    **How to read it:**
    
    After decompiling with `apktool`, the manifest is automatically decoded from binary XML to human-readable format:
    
    ```bash
    cat ~/Downloads/base/AndroidManifest.xml
    ```
    
    You can also view the raw manifest directly from the APK using:
    
    ```bash
    aapt dump xmltree base.apk AndroidManifest.xml
    ```
    
    **Link:** https://developer.android.com/guide/topics/manifest/manifest-intro
    

---

The manifest is your map of the application. Always read it first.

```bash
cat ~/Downloads/base/AndroidManifest.xml
```

**What to look for:**

**Permissions declared** — The WIC Connect app requests:

```
ACCESS_FINE_LOCATION
ACCESS_COARSE_LOCATION
CAMERA
READ_EXTERNAL_STORAGE
WRITE_EXTERNAL_STORAGE
INTERNET
ACCESS_WIFI_STATE / CHANGE_WIFI_STATE
```

Location + Camera + Storage on a government benefits app warrants scrutiny. Ask: does the app's stated purpose require all of these?

**Hardcoded API keys in `<meta-data>`** — The manifest contains:

```xml
<meta-data android:name="com.google.android.geo.API_KEY"
           android:value="AIzaSyB_WrI9NR9ufD-HeyVDDP_kQTwAaWpBl8A"/>
```

This is a **live Google Maps API key** embedded directly in the manifest. An analyst or attacker could use this key to make API calls billed to the app developer.

**Facebook SDK integration:**

```xml
<meta-data android:name="com.facebook.sdk.ApplicationId" android:value="@string/app_id"/>
```

The Facebook App ID (`415282912139056`) is stored in `res/values/strings.xml`. This means the app sends analytics or login data to Facebook.

**Entry points (exported Activities):**

```
crc64cf4cf6bac5085ed0.SplashActivity1  ← MAIN launcher
crc64b9fa62efa3c1240d.WebAuthenticationCallbackActivity  ← handles OAuth redirects (scheme: miwic://)
```

**Xamarin runtime indicator:**

```xml
<provider android:name="mono.MonoRuntimeProvider" .../>
```

The presence of `mono.MonoRuntimeProvider` and `crc64...` class name prefixes confirms this is a **Xamarin/.NET** app. The real logic is in C# DLLs, not Java — go to Phase 3.

### Step 5: Check strings.xml for Hardcoded Values

```bash
cat ~/Downloads/base/res/values/strings.xml | grep -i "api\\|key\\|token\\|url\\|id\\|secret"
```

In WIC Connect, `strings.xml` reveals:

```xml
<string name="app_id">415282912139056</string>   <!-- Facebook App ID -->
<string name="app_name">WIC Connect</string>
```

OAuth token-related strings (`access_token_expires_at`, `refresh_token`, etc.) also appear, indicating the app implements an OAuth authentication flow.

# Phase 3: Xamarin Unpacking with pyxamstore

Because this is a Xamarin app, the actual application logic lives in `.dll` files compressed inside `unknown/assemblies/assemblies.blob` — not in the Smali code.

Before running in the pyxamstore github repo directory

```jsx
python3 -m venv venv
source venv/bin/activate
```

```jsx
pip install -e .
```

### Step 6: Verify the Assembly Store Exists

```bash
ls ~/Downloads/base/unknown/assemblies/
# assemblies.blob   assemblies.manifest
```

The `assemblies.manifest` lists every DLL packed inside the blob:

```bash
cat ~/Downloads/base/unknown/assemblies/assemblies.manifest
```

Key app-specific assemblies in WIC Connect:

### Step 7: Activate the pyxamstore Environment

```bash
cd ~/pyxamstore
source venv/bin/activate
```

### Step 8: Unpack the Assembly Blob

```bash

cd ~/Downlaods
	pyxamstore unpack -d base/unknown/assemblies/
```

This extracts `.dll` files (one per assembly listed in the manifest) into the current directory or a specified output path. You now have the C# binaries ready for decompilation.

# Phase 4: C# Decompilation with ilspycmd

`ilspycmd` decompiles `.dll` files back into readable C# source code.

### Step 9: Decompile a Target DLL

Start with the most interesting assemblies. `WCCMobile.dll` contains the core app logic.

```bash
ilspycmd out/WCCMobile.dll -o ./decompiled_wccmobile/
```

This writes `.cs` source files into the output directory organized by namespace.

**Decompile the Android-specific entry point:**

```bash
ilspycmd out/WCCMobile.Droid.dll -o ./decompiled_droid/
```

### Step 10: Analyzing the Decompiled C# Code

Navigate the output in `~/Downloads/base/` (if you decompile there) and look for:

**Authentication logic** — Search for JWT and OAuth handling:

```bash
grep -r "token\\|Bearer\\|OAuth\\|login\\|password" ./decompiled_droid/ -r
```

**API endpoint URLs** — Hardcoded server addresses:

```bash
grep -r "http\\|https\\|api\\." ./decompiled_droid/ -r
```

**Cryptographic operations** — Look at how `PCLCrypto` is used:

```bash
grep -r "Encrypt\\|Decrypt\\|AES\\|RSA\\|Hash" ./decompiled_droid/ -r
```

**Data storage** — Check for SharedPreferences, SQLite, or file writes that might store sensitive WIC benefit data:grep -r "Encrypt\\|Decrypt\\|AES\\|RSA\\|Hash" ./decompiled_droid/ -l

```bash
	grep -r "SharedPreferences\\|SQLite\\|File.Write\\|StorageFile" ./decompiled_droid/ -r
```

**What to look for in the code:**

- Are JWT tokens validated properly (signature verification, expiration checks)?
- Is the OAuth `state` parameter checked to prevent CSRF?
- Is sensitive data (EBT card numbers, household info) stored unencrypted on disk?
- Does `PCLCrypto` use hardcoded keys or IVs?
- Are there any debug endpoints or dev-only flags left in production?

# Phase 5: String Extraction with pestring

Even before fully decompiling, `pestring` can surface interesting strings quickly.

### Step 11: Extract Strings from the Assembly Blob

```bash
strings ~/Downloads/base/unknown/assemblies/assemblies.blob > strings.txt
```

**Search the output:**

C2 or API servers

```bash
grep -i "http\\|https\\|\\.com\\|\\.gov\\|\\.io" strings.txt
```

Authentication artifacts

```bash
grep -i "bearer\\|token\\|jwt\\|oauth\\|client_id\\|client_secret" strings.txt
```

File system path

```bash
grep -i "/data/\\|/sdcard/\\|/storage/" strings.txt
```

Shell commands (red flag in any app)

```bash
 
grep -i "chmod\\|exec\\|sh -c\\|/bin/" strings.txt
```

For WIC Connect, expect to find references to Michigan DHHS servers (`michigan.gov`) and potentially OAuth authorization endpoints used for the authentication flow.

# Phase 6: Native Library Analysis with Ghidra

### Step 12: Open Ghidra and Create a Project

1. Launch Ghidra: `ghidra` (or from the application menu)
2. **File → New Project** → Non-Shared Project → choose a directory and name it
3. Click **Finish**

### Step 12: Open Ghidra and Import APK

1. **File → Import File**
2. Navigate to `~/Downloads/base.apk`
3. Select **Single File**
4. Select **Android10** as the Language

![setting android 10](image.png)

### Step 14: Run Auto-Analysis

1. Double-click the **classes.dex** file
2. Select all defaults and continue

### Step 15: Navigate the Decompiler

The **Decompiler** window (right panel) is your primary tool. It converts assembly instructions back into pseudo-C code.

**Key windows to use:**

Note if any view is missing, click on Window and select it.

- **Symbol Tree** (left panel) → `Functions` → browse all identified functions
- **Program Trees** → shows memory segments (`.text`, `.data`, `.rodata`, etc.)
- **Decompiler** → shows C-like pseudocode for the selected function
- **Listing** → raw disassembly view

### Step 16: Find JNI Bridge Functions

JNI (Java Native Interface) functions are the bridge between Java/C# and native C code. They always start with `Java_`:

1. Press **Ctrl+F** (Search → Program Text)
2. Search for `Java_` in **Function Names**
3. Each result is an entry point callable from the managed runtime

Click any `Java_` function to see its decompiled C pseudocode in the Decompiler window.

### Step 17: Identify Suspicious Patterns in Native Code

In the Decompiler window, look for:

**Network calls:**

```c
// Look for socket(), connect(), send(), recv() calls
// or higher-level HTTP functions
```

**String obfuscation** — XOR loops are a common technique:

```c
// A loop that XORs each byte of a buffer with a key byte
for (i = 0; i < len; i++) {
    buf[i] = buf[i] ^ key[i % keylen];
}
```

**Crypto operations** — Look for `AES`, `RSA`, or custom implementations in `.rodata` (read-only data segment, where S-boxes and constants live).

**Anti-analysis tricks:**

- `ptrace(PTRACE_TRACEME, ...)` — debugger detection
- `getprop ro.build.tags` calls — emulator detection
- Time-based checks

### Step 18: Rename Symbols for Clarity

Ghidra's default names like `FUN_00401234` are meaningless. As you understand functions, rename them:

1. Right-click on a function name → **Rename Function**
2. Give it a descriptive name (e.g., `decrypt_payload`, `check_root`)

This makes the call graph much easier to follow as the analysis progresses.

---

# Summary: Full Workflow

```
base.apk
│
├─ sha256sum → VirusTotal lookup
├─ pehash → structural similarity check
│
├─ apktool d base.apk -o ~/Downloads/base/
│   ├─ AndroidManifest.xml → permissions, API keys, entry points
│   └─ res/values/strings.xml → hardcoded values
│
├─ pestring assemblies.blob > strings.txt → quick string triage
│
├─ pyxamstore unpack -d unknown/assemblies/ → extract .dll files
│   └─ ilspycmd WCCMobile.dll -o ./decompiled/ → C# source
│       ├─ grep for API URLs, tokens, crypto usage
│       └─ audit auth flow, data storage, input validation
│
└─ Ghidra → lib/arm64-v8a/*.so
    ├─ Auto-Analyze
    ├─ Find Java_ JNI functions
    └─ Decompiler → audit native logic
```

# Red Flags Summary for WIC Connect

| Finding | Location | Severity |
| --- | --- | --- |
| Google Maps API key hardcoded | `AndroidManifest.xml` | Medium |
| Facebook SDK embedded (data sharing) | `AndroidManifest.xml` + `strings.xml` | Medium |
| Location + Camera + Storage permissions | `AndroidManifest.xml` | Review |
| OAuth/JWT logic in `WCCMobile.dll` | `assemblies.blob` | Needs audit |
| QR/barcode scanning (`zxing`) | `assemblies.manifest` | Context-dependent |
