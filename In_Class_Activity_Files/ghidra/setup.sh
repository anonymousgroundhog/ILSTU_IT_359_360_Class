#!/usr/bin/env bash
set -euo pipefail

# ── helpers ────────────────────────────────────────────────────────────────
GREEN='\033[0;32m'; YELLOW='\033[1;33m'; RED='\033[0;31m'; NC='\033[0m'
info()    { echo -e "${GREEN}[+]${NC} $*"; }
warning() { echo -e "${YELLOW}[!]${NC} $*"; }
error()   { echo -e "${RED}[-]${NC} $*" >&2; exit 1; }

require_sudo() {
    if [[ $EUID -eq 0 ]]; then
        error "Do not run this script as root. It will call sudo when needed."
    fi
    sudo -v || error "sudo access required."
    # Keep sudo alive for the duration of the script
    while true; do sudo -n true; sleep 60; kill -0 "$$" 2>/dev/null || exit; done &
}

# ── main ───────────────────────────────────────────────────────────────────
require_sudo

info "Updating package lists..."
sudo apt update -y

# ── Ghidra ─────────────────────────────────────────────────────────────────
if snap list ghidra &>/dev/null; then
    warning "Ghidra is already installed, skipping."
else
    info "Installing Ghidra via snap..."
    sudo snap install ghidra
fi

# ── apktool ────────────────────────────────────────────────────────────────
if command -v apktool &>/dev/null; then
    warning "apktool is already installed, skipping."
else
    info "Installing apktool..."
    sudo apt install -y apktool
fi

# ── pev (pehash / pestring) ────────────────────────────────────────────────
if command -v pehash &>/dev/null; then
    warning "pev is already installed, skipping."
else
    info "Installing pev..."
    sudo apt install -y pev
fi

# ── .NET SDK + ilspycmd ────────────────────────────────────────────────────
if command -v dotnet &>/dev/null; then
    warning ".NET SDK is already installed, skipping."
else
    info "Installing .NET SDK 8.0..."
    sudo apt install -y dotnet-sdk-8.0
fi

if dotnet tool list -g 2>/dev/null | grep -qi "ilspycmd"; then
    warning "ilspycmd is already installed, skipping."
else
    info "Installing ilspycmd..."
    dotnet tool install -g IlSpyCmd
fi

# Add .NET tools to PATH if not already present
DOTNET_TOOLS_PATH="$HOME/.dotnet/tools"
PROFILE_FILE="$HOME/.bash_profile"

if ! grep -q "$DOTNET_TOOLS_PATH" "$PROFILE_FILE" 2>/dev/null; then
    info "Adding .NET tools to PATH in $PROFILE_FILE..."
    cat << 'EOF' >> "$PROFILE_FILE"

# Add .NET Core SDK tools
export PATH="$PATH:/home/vmuser/.dotnet/tools"
EOF
    # Also export for the current session
    export PATH="$PATH:$DOTNET_TOOLS_PATH"
    info "PATH updated. Run 'source ~/.bash_profile' after this script finishes."
else
    warning ".NET tools PATH entry already exists in $PROFILE_FILE, skipping."
fi

# ── pyxamstore dependencies ────────────────────────────────────────────────
info "Installing pyxamstore system dependencies..."
sudo apt install -y python3-pip python3-lz4 python3-xxhash python3-venv git

# ── pyxamstore clone + venv install ───────────────────────────────────────
PYXAM_DIR="$HOME/pyxamstore"

if [[ -d "$PYXAM_DIR" ]]; then
    warning "pyxamstore directory already exists at $PYXAM_DIR, skipping clone."
else
    info "Cloning pyxamstore..."
    git clone https://github.com/jakev/pyxamstore.git "$PYXAM_DIR"
fi

if [[ -d "$PYXAM_DIR/venv" ]]; then
    warning "pyxamstore venv already exists, skipping venv setup."
else
    info "Creating pyxamstore virtual environment..."
    python3 -m venv "$PYXAM_DIR/venv"

    info "Installing pyxamstore into venv..."
    "$PYXAM_DIR/venv/bin/pip" install --upgrade pip
    "$PYXAM_DIR/venv/bin/pip" install "$PYXAM_DIR"
fi

# ── done ───────────────────────────────────────────────────────────────────
echo ""
info "Setup complete. All tools installed:"
echo "  • ghidra       → run: ghidra"
echo "  • apktool      → run: apktool d <file.apk> -o <output_dir>"
echo "  • pev          → run: pehash <file>  |  pestring <file>"
echo "  • ilspycmd     → run: ilspycmd <file.dll> -o <output_dir>"
echo "  • pyxamstore   → activate: source ~/pyxamstore/venv/bin/activate"
echo "                   then run: pyxamstore unpack -d <assemblies_dir>"
echo ""
warning "Remember to run: source ~/.bash_profile"
warning "Download an APK from https://apkpure.com/ to begin analysis."
