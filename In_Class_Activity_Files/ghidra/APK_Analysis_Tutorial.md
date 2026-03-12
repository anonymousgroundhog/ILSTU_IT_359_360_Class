# APK Analysis Tutorial

This tutorial walks through a complete APK analysis workflow using the tools installed in `README.md`. Each phase builds on the previous one, taking you from a raw APK file to deep reverse engineering of native code.

The sample target used throughout this tutorial is the **WIC Connect** app (`gov.michigan.dhhs.miwic`), already decompiled to `~/Downloads/base/`.

---

## Tool Overview

| Tool | Purpose |
|------|---------|
| `sha256sum` | Hash the APK for VirusTotal lookup |
| `pehash` (pev) | Structural similarity hashing |
| `apktool` | Decompile APK → Smali + resources |
| `pestring` (pev) | Extract strings from binary |
| `pyxamstore` | Unpack Xamarin `.blob` → `.dll` files |
| `ilspycmd` | Decompile `.dll` files → readable C# |
| `ghidra` | Disassemble/decompile native `.so` libraries |

---

## Phase 1: Initial Triage

Before touching the file locally, get quick intelligence from public sources.

### Step 1: Hash the APK

```bash
sha256sum base.apk
```

Take the resulting SHA-256 hash and search it on **VirusTotal** (virustotal.com). Look for:
- Detection ratio (e.g., `3/72`) — how many AV engines flag it
- Identified malware family names under the "Detection" tab
- The "Behavior" tab for sandbox-observed network calls and file writes

### Step 2: Structural Hashing with pehash

`pehash` generates a hash based on the *structure* of the file rather than its content. Two APKs repackaged from the same builder will share a `pehash` even if their content hashes differ.

```bash
pehash base.apk
```

Compare this output against known malware databases or other samples you're investigating to detect family relationships.

---

## Phase 2: Decompile with Apktool

`apktool` is the first real step into the APK. It decodes resources and converts `classes.dex` into human-readable **Smali** bytecode.

### Step 3: Decompile the APK

```bash
apktool d base.apk -o ~/Downloads/base/
```

This produces the directory structure already present at `~/Downloads/base/`.

### Step 4: Read the AndroidManifest.xml

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
cat ~/Downloads/base/res/values/strings.xml | grep -i "api\|key\|token\|url\|id\|secret"
```

In WIC Connect, `strings.xml` reveals:
```xml
<string name="app_id">415282912139056</string>   <!-- Facebook App ID -->
<string name="app_name">WIC Connect</string>
```

OAuth token-related strings (`access_token_expires_at`, `refresh_token`, etc.) also appear, indicating the app implements an OAuth authentication flow.

---

## Phase 3: Xamarin Unpacking with pyxamstore

Because this is a Xamarin app, the actual application logic lives in `.dll` files compressed inside `unknown/assemblies/assemblies.blob` — not in the Smali code.

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
| Assembly | Purpose |
|----------|---------|
| `WCCMobile.Droid` | Android-specific entry points and platform code |
| `WCCMobile` | Core application logic (most important target) |
| `Core` | Shared core library |
| `JWT` | JSON Web Token handling — authentication |
| `IdentityModel` | OAuth/OIDC identity library |
| `PCLCrypto` | Cryptographic operations |
| `Autofac` | Dependency injection container |
| `zxing` / `ZXingNetMobile` | QR/barcode scanning |

### Step 7: Activate the pyxamstore Environment

```bash
cd ~/pyxamstore
source venv/bin/activate
```

### Step 8: Unpack the Assembly Blob

```bash
pyxamstore unpack -d ~/Downloads/base/unknown/assemblies/
```

This extracts `.dll` files (one per assembly listed in the manifest) into the current directory or a specified output path. You now have the C# binaries ready for decompilation.

---

## Phase 4: C# Decompilation with ilspycmd

`ilspycmd` decompiles `.dll` files back into readable C# source code.

### Step 9: Decompile a Target DLL

Start with the most interesting assemblies. `WCCMobile.dll` contains the core app logic.

```bash
ilspycmd WCCMobile.dll -o ./decompiled_wccmobile/
```

This writes `.cs` source files into the output directory organized by namespace.

**Decompile the Android-specific entry point:**
```bash
ilspycmd WCCMobile.Droid.dll -o ./decompiled_droid/
```

### Step 10: Analyzing the Decompiled C# Code

Navigate the output in `~/Downloads/base/` (if you decompile there) and look for:

**Authentication logic** — Search for JWT and OAuth handling:
```bash
grep -r "token\|Bearer\|OAuth\|login\|password" ./decompiled_wccmobile/ -l
```

**API endpoint URLs** — Hardcoded server addresses:
```bash
grep -r "http\|https\|api\." ./decompiled_wccmobile/ -r
```

**Cryptographic operations** — Look at how `PCLCrypto` is used:
```bash
grep -r "Encrypt\|Decrypt\|AES\|RSA\|Hash" ./decompiled_wccmobile/ -l
```

**Data storage** — Check for SharedPreferences, SQLite, or file writes that might store sensitive WIC benefit data:
```bash
grep -r "SharedPreferences\|SQLite\|File.Write\|StorageFile" ./decompiled_wccmobile/ -l
```

**What to look for in the code:**
- Are JWT tokens validated properly (signature verification, expiration checks)?
- Is the OAuth `state` parameter checked to prevent CSRF?
- Is sensitive data (EBT card numbers, household info) stored unencrypted on disk?
- Does `PCLCrypto` use hardcoded keys or IVs?
- Are there any debug endpoints or dev-only flags left in production?

---

## Phase 5: String Extraction with pestring

Even before fully decompiling, `pestring` can surface interesting strings quickly.

### Step 11: Extract Strings from the Assembly Blob

```bash
pestring ~/Downloads/base/unknown/assemblies/assemblies.blob > strings.txt
```

**Search the output:**

```bash
# C2 or API servers
grep -i "http\|https\|\.com\|\.gov\|\.io" strings.txt

# Authentication artifacts
grep -i "bearer\|token\|jwt\|oauth\|client_id\|client_secret" strings.txt

# File system paths
grep -i "/data/\|/sdcard/\|/storage/" strings.txt

# Shell commands (red flag in any app)
grep -i "chmod\|exec\|sh -c\|/bin/" strings.txt
```

For WIC Connect, expect to find references to Michigan DHHS servers (`michigan.gov`) and potentially OAuth authorization endpoints used for the authentication flow.

---

## Phase 6: Native Library Analysis with Ghidra

The `lib/` directory contains compiled C/C++ native libraries (`.so` files) for multiple architectures. These often contain the most sensitive or obfuscated code.

```bash
ls ~/Downloads/base/lib/arm64-v8a/
# libmono-btls-shared.so  libmonodroid.so  libmono-native.so
# libmonosgen-2.0.so  libxa-internal-api.so
# libxamarin-app.so  libxamarin-debug-app-helper.so
```

For WIC Connect, these are all Xamarin/Mono runtime libraries. In a malware scenario, you would also see custom native libraries here (e.g., `libnative-lib.so`, `libcrypto_custom.so`).

### Step 12: Open Ghidra and Create a Project

1. Launch Ghidra: `ghidra` (or from the application menu)
2. **File → New Project** → Non-Shared Project → choose a directory and name it
3. Click **Finish**

### Step 13: Import a Native Library

1. **File → Import File**
2. Navigate to `~/Downloads/base/lib/arm64-v8a/`
3. Select a `.so` file (e.g., `libxamarin-app.so`)
4. Ghidra will auto-detect the format as **ELF / AArch64**
5. Click **OK**, then **OK** again on the import summary

### Step 14: Run Auto-Analysis

1. Double-click the imported file to open it in the **Code Browser**
2. When prompted to analyze, click **Yes**
3. Leave all default analyzers checked and click **Analyze**
4. Wait for analysis to complete (progress shown in the bottom-right corner)

### Step 15: Navigate the Decompiler

The **Decompiler** window (right panel) is your primary tool. It converts assembly instructions back into pseudo-C code.

**Key windows to use:**
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

## Summary: Full Workflow

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

### Red Flags Summary for WIC Connect

| Finding | Location | Severity |
|---------|----------|----------|
| Google Maps API key hardcoded | `AndroidManifest.xml` | Medium |
| Facebook SDK embedded (data sharing) | `AndroidManifest.xml` + `strings.xml` | Medium |
| Location + Camera + Storage permissions | `AndroidManifest.xml` | Review |
| OAuth/JWT logic in `WCCMobile.dll` | `assemblies.blob` | Needs audit |
| QR/barcode scanning (`zxing`) | `assemblies.manifest` | Context-dependent |
