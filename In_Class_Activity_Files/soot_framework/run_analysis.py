#!/usr/bin/env python3
"""
IT 359 – Tools and Techniques in Penetration Testing
Illinois State University

run_analysis.py
===============
Helper script that:
  1. Verifies prerequisites (Java 11+, Maven, Android SDK platforms)
  2. Builds the Soot analyzer JAR with Maven (if not already built)
  3. Runs the JAR against a user-supplied APK
  4. Opens the output directory when analysis is complete

Usage:
    python3 run_analysis.py <path/to/app.apk> [options]

Options:
    --platforms DIR   Android SDK platforms directory
                      (auto-detected from ANDROID_HOME if omitted)
    --output DIR      Output directory for reports (default: soot_output)
    --rebuild         Force Maven rebuild even if the JAR already exists
    --open            Open the output folder when done (xdg-open / open)
    -h, --help        Show this help message
"""

import argparse
import os
import platform
import shutil
import subprocess
import sys
from pathlib import Path


# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------
SCRIPT_DIR   = Path(__file__).resolve().parent
JAR_PATH     = SCRIPT_DIR / "target" / "soot-apk-analyzer-1.0.0.jar"
POM_PATH     = SCRIPT_DIR / "pom.xml"
DEFAULT_OUT  = SCRIPT_DIR / "soot_output"

# Common Android SDK locations to probe when ANDROID_HOME is not set
SDK_CANDIDATES = [
    Path.home() / "android-sdk" / "platforms",
    Path.home() / "Android" / "Sdk" / "platforms",
    Path("/opt/android-sdk/platforms"),
    Path("/usr/lib/android-sdk/platforms"),
]


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------
def banner():
    print("=" * 55)
    print("  Soot APK Analyzer – IT 359, Illinois State University")
    print("=" * 55)
    print()


def check_java() -> bool:
    """Return True if Java 11+ is available on PATH."""
    java = shutil.which("java")
    if not java:
        print("[!] Java not found. Install JDK 11+ and add it to PATH.")
        return False
    result = subprocess.run(
        ["java", "-version"], capture_output=True, text=True
    )
    version_line = (result.stdout + result.stderr).splitlines()[0]
    print(f"[*] Java: {version_line}")
    return True


def check_maven() -> bool:
    """Return True if Maven (mvn) is available on PATH."""
    mvn = shutil.which("mvn")
    if not mvn:
        print("[!] Maven (mvn) not found.")
        print("    Install with:  sudo apt install maven   OR")
        print("                   brew install maven")
        return False
    result = subprocess.run(["mvn", "--version"], capture_output=True, text=True)
    print(f"[*] Maven: {result.stdout.splitlines()[0]}")
    return True


def resolve_platforms(user_path: str | None) -> Path | None:
    """Locate the Android SDK platforms directory."""
    if user_path:
        p = Path(user_path).expanduser().resolve()
        if p.is_dir():
            return p
        print(f"[!] Specified platforms directory not found: {user_path}")
        return None

    # ANDROID_HOME env var
    android_home = os.environ.get("ANDROID_HOME")
    if android_home:
        p = Path(android_home) / "platforms"
        if p.is_dir():
            return p

    # Probe common locations
    for candidate in SDK_CANDIDATES:
        if candidate.is_dir():
            return candidate

    return None


def build_jar(force: bool = False) -> bool:
    """Compile the project with Maven. Returns True on success."""
    if JAR_PATH.exists() and not force:
        print(f"[*] JAR already built: {JAR_PATH}")
        return True

    if not POM_PATH.exists():
        print(f"[!] pom.xml not found at {POM_PATH}")
        return False

    print("[*] Building with Maven (this may take a minute on first run)…")
    result = subprocess.run(
        ["mvn", "clean", "package", "-q"],
        cwd=SCRIPT_DIR,
    )
    if result.returncode != 0:
        print("[!] Maven build failed. Run 'mvn package' manually to see errors.")
        return False

    if not JAR_PATH.exists():
        print(f"[!] Build succeeded but JAR not found at expected path: {JAR_PATH}")
        return False

    print(f"[+] Build complete: {JAR_PATH}")
    return True


def run_soot(apk_path: Path, platforms_dir: Path, output_dir: Path) -> int:
    """Invoke the Soot analyzer JAR. Returns the process exit code."""
    cmd = [
        "java",
        "-Xmx4g",          # 4 GB heap – increase for very large APKs
        "-jar", str(JAR_PATH),
        str(apk_path),
        str(platforms_dir),
        str(output_dir),
    ]
    print(f"[*] Running: {' '.join(cmd)}\n")
    result = subprocess.run(cmd)
    return result.returncode


def open_output(output_dir: Path):
    """Open the output directory in the default file manager."""
    system = platform.system()
    opener = {
        "Linux": "xdg-open",
        "Darwin": "open",
        "Windows": "explorer",
    }.get(system)
    if opener and shutil.which(opener):
        subprocess.Popen([opener, str(output_dir)])


def print_report_summary(output_dir: Path):
    """Print a quick summary of the generated report files."""
    reports = {
        "sensitive_apis.txt":   "Sensitive API calls",
        "string_constants.txt": "Extracted string constants",
        "class_method_map.txt": "Class/method map",
    }
    print("\n=== REPORT SUMMARY ===")
    for filename, label in reports.items():
        path = output_dir / filename
        if path.exists():
            lines = [l for l in path.read_text().splitlines() if l.strip()]
            # Subtract header lines (3) to count actual findings
            findings = max(0, len(lines) - 4)
            print(f"  {label:30s}  {findings:>5} lines  →  {path}")
        else:
            print(f"  {label:30s}  (not generated)")

    jimple_dir = output_dir / "jimple"
    if jimple_dir.is_dir():
        jimple_files = list(jimple_dir.rglob("*.jimple"))
        print(f"  {'Jimple IR files':30s}  {len(jimple_files):>5} files  →  {jimple_dir}")


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------
def main():
    banner()

    parser = argparse.ArgumentParser(
        description="Build and run the Soot APK Analyzer.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    parser.add_argument("apk", help="Path to the target APK file")
    parser.add_argument(
        "--platforms",
        metavar="DIR",
        help="Android SDK platforms directory (auto-detected if omitted)",
    )
    parser.add_argument(
        "--output",
        metavar="DIR",
        default=str(DEFAULT_OUT),
        help="Output directory for reports (default: soot_output)",
    )
    parser.add_argument(
        "--rebuild",
        action="store_true",
        help="Force Maven rebuild even if the JAR already exists",
    )
    parser.add_argument(
        "--open",
        action="store_true",
        help="Open the output directory when analysis is complete",
    )
    args = parser.parse_args()

    # --- Validate APK ---
    apk_path = Path(args.apk).expanduser().resolve()
    if not apk_path.exists():
        print(f"[!] APK file not found: {apk_path}")
        sys.exit(1)
    if apk_path.suffix.lower() != ".apk":
        print(f"[!] Warning: file does not have .apk extension: {apk_path}")

    print(f"[*] APK            : {apk_path}")

    # --- Check prerequisites ---
    if not check_java():
        sys.exit(1)
    if not check_maven():
        sys.exit(1)

    # --- Resolve Android platforms ---
    platforms_dir = resolve_platforms(args.platforms)
    if platforms_dir is None:
        print("[!] Could not locate Android SDK platforms directory.")
        print("    Options:")
        print("      1. Set ANDROID_HOME environment variable")
        print("      2. Pass --platforms /path/to/android-sdk/platforms")
        print("      3. Install Android SDK: sudo apt install android-sdk")
        sys.exit(1)
    print(f"[*] Android SDK    : {platforms_dir}")

    output_dir = Path(args.output).expanduser().resolve()
    print(f"[*] Output dir     : {output_dir}")
    print()

    # --- Build ---
    if not build_jar(force=args.rebuild):
        sys.exit(1)

    # --- Analyse ---
    exit_code = run_soot(apk_path, platforms_dir, output_dir)

    if exit_code == 0:
        print_report_summary(output_dir)
        if args.open:
            open_output(output_dir)
        print("\n[+] Analysis complete.")
    else:
        print(f"\n[!] Analyzer exited with code {exit_code}.")
        print("    Check the output above for error details.")

    sys.exit(exit_code)


if __name__ == "__main__":
    main()
