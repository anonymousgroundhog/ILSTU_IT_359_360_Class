# Soot APK Analyzer

IT 359 – Tools and Techniques in Penetration Testing
Illinois State University

Static analysis of Android APKs using the [Soot](https://soot-oss.github.io/soot/) framework.

---

## What it does

| Analysis | Output file |
|---|---|
| Lists every class and method | `soot_output/class_method_map.txt` |
| Flags sensitive API calls (crypto, network, SMS, reflection, exec) | `soot_output/sensitive_apis.txt` |
| Extracts string constants ≥ 6 characters | `soot_output/string_constants.txt` |
| Dumps Jimple IR for every class | `soot_output/jimple/` |

---

## Prerequisites

| Tool | Install |
|---|---|
| JDK 11+ | `sudo apt install openjdk-17-jdk` |
| Maven 3.6+ | `sudo apt install maven` |
| Android SDK platforms | see below |

### Android SDK platforms

Soot needs the `android.jar` for your target API level.

> **Note:** `sudo apt install android-sdk` installs the SDK tools but does **not** include any platform JARs. You must install platforms separately using `sdkmanager` as shown below.

```bash
# 1. Install the base SDK tools
sudo apt install android-sdk

# 2. Add sdkmanager to your PATH
export PATH="$PATH:/usr/lib/android-sdk/tools/bin"

# 3. Install the platform(s) you need (API 33 shown; adjust as needed)
sdkmanager "platforms;android-33"

# 4. Accept the license if prompted
sdkmanager --licenses
```

If `sdkmanager` is not available after the apt install, install it via the command-line tools package:

```bash
# Download the latest command-line tools
mkdir -p ~/android-sdk/cmdline-tools
cd ~/android-sdk/cmdline-tools
wget https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip
unzip commandlinetools-linux-11076708_latest.zip
mv cmdline-tools latest

# Install a platform
~/android-sdk/cmdline-tools/latest/bin/sdkmanager "platforms;android-33"
```

Then set `ANDROID_HOME`:
```bash
export ANDROID_HOME=~/android-sdk          # or /usr/lib/android-sdk
```

Verify that the platform JAR exists before running the analyzer:
```bash
ls $ANDROID_HOME/platforms/android-33/android.jar
```

---

## Quick start

```bash
# 1. Clone / navigate to this directory
cd In_Class_Activity_Files/soot_framework

# 2. Run the Python helper (builds + analyses in one step)
python3 run_analysis.py /path/to/target.apk

# 3. View reports
ls soot_output/
```

The helper auto-detects the Android SDK from `ANDROID_HOME` or common paths.

---

## Command-line options

```
python3 run_analysis.py <apk-file> [options]

  --platforms DIR   Android SDK platforms directory
  --output DIR      Output directory (default: soot_output)
  --rebuild         Force Maven rebuild
  --open            Open the output folder when done
```

---

## Manual build & run (no Python helper)

```bash
# Build the fat JAR
mvn clean package

# Run directly
java -Xmx4g -jar target/soot-apk-analyzer-1.0.0.jar \
    /path/to/app.apk \
    ~/android-sdk/platforms \
    soot_output
```

---

## Sensitive APIs checked

The analyzer flags calls to:

- **Crypto** – `Cipher.getInstance`, `MessageDigest.getInstance`, `SecretKeySpec` (hardcoded key risk)
- **Network** – `URL.<init>`, OkHttp client creation, `WebView.loadUrl`
- **Telephony** – `SmsManager.sendTextMessage`, `TelephonyManager.getDeviceId`
- **Reflection** – `Method.invoke`, `Class.forName`
- **Storage** – `SharedPreferences`, `FileOutputStream`
- **Native** – `System.loadLibrary`
- **Exec** – `Runtime.exec`

Add your own entries to the `SENSITIVE_APIS` map in `ApkAnalyzer.java`.

---

## Project structure

```
soot_framework/
├── pom.xml                             Maven build descriptor
├── run_analysis.py                     Python helper (build + run)
├── README.md                           This file
└── src/main/java/edu/ilstu/
    └── ApkAnalyzer.java                Main analysis class
```

---

## Tips

- **Memory** – Large APKs may need more heap: edit `run_analysis.py` and change `-Xmx4g` to `-Xmx8g`.
- **First build** – Maven downloads ~150 MB of dependencies on the first run; subsequent builds are fast.
- **Jimple IR** – The files in `soot_output/jimple/` are Soot's intermediate representation. They are very readable and useful for manual review.
- **Pair with apktool** – Use `apktool d app.apk` to also inspect the `AndroidManifest.xml` and resource strings alongside the Soot output.
