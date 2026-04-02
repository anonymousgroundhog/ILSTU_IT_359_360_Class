# IR/DR Plan Builder — Setup Guide

A professional, cross-platform web-based tool for creating Incident Response and Disaster Recovery plans. No login required. Works on Mac, Windows, and Linux.

## Quick Start

1. **Locate the `ir_dr_plan_builder_node` folder** on your system
2. Open a terminal/command prompt in that folder
3. Run:
   ```bash
   npm install
   npm start
   ```
4. Open your browser to `http://localhost:3001`

> **Note:** The location of this folder may vary depending on your system. It could be in Documents, Downloads, or any other directory. The key is finding where `ir_dr_plan_builder_node` is located.

---

## How to Navigate to the App Folder

### 🍎 macOS / 🐧 Linux

**Using Terminal:**
```bash
# If you know the path:
cd /path/to/ir_dr_plan_builder_node

# Or find it:
find ~ -type d -name "ir_dr_plan_builder_node" 2>/dev/null
```

**Using GUI:**
1. Open Finder/File Manager
2. Locate the `ir_dr_plan_builder_node` folder
3. Right-click → "Open in Terminal" (or similar option)
4. Skip to "Running the App" below

### 🪟 Windows

**Using PowerShell:**
```powershell
# If you know the path:
cd "C:\path\to\ir_dr_plan_builder_node"

# Or find it:
Get-ChildItem -Path $HOME -Filter "ir_dr_plan_builder_node" -Recurse -ErrorAction SilentlyContinue
```

**Using GUI:**
1. Open File Explorer
2. Locate the `ir_dr_plan_builder_node` folder
3. Click the address bar and type `powershell` then press Enter
4. Skip to "Running the App" below

---

## Setup by Operating System

### 🍎 macOS

#### Prerequisites
- **Node.js v18+** (we use v24.11.1)
- **npm v8+** (comes with Node.js)

#### Installation

**Option 1: Homebrew (Recommended)**
```bash
brew install node
```

**Option 2: Direct Download**
1. Visit https://nodejs.org/
2. Download the LTS version
3. Run the installer
4. Verify installation:
   ```bash
   node --version
   npm --version
   ```

#### Running the App

Once you've navigated to the `ir_dr_plan_builder_node` folder (see "How to Navigate to the App Folder" above):

```bash
npm install
npm start
```

The app will print:
```
✅ IR/DR Plan Builder running at http://localhost:3001

📖 Open your browser and visit: http://localhost:3001
```

Open your browser and go to `http://localhost:3001`

---

### 🪟 Windows

#### Prerequisites
- **Node.js v18+** (we use v24.11.1)
- **npm v8+** (comes with Node.js)

#### Installation

**Option 1: Using Windows Package Manager (Recommended)**
```powershell
winget install OpenJS.NodeJS
```

**Option 2: Direct Download**
1. Visit https://nodejs.org/
2. Download the LTS version (.msi installer)
3. Run the installer (accept all defaults)
4. Restart your computer
5. Verify installation:
   ```powershell
   node --version
   npm --version
   ```

**Option 3: Chocolatey**
```powershell
choco install nodejs
```

#### Running the App

Once you've navigated to the `ir_dr_plan_builder_node` folder (see "How to Navigate to the App Folder" above):

**Using PowerShell:**
```powershell
npm install
npm start
```

**Using Command Prompt (cmd.exe):**
```cmd
npm install
npm start
```

The app will print:
```
✅ IR/DR Plan Builder running at http://localhost:3001

📖 Open your browser and visit: http://localhost:3001
```

Open your browser and go to `http://localhost:3001`

---

### 🐧 Linux

#### Prerequisites
- **Node.js v18+** (we use v24.11.1)
- **npm v8+** (comes with Node.js)
- **curl** (usually pre-installed)

#### Installation

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install nodejs npm
```

**Fedora/RHEL/CentOS:**
```bash
sudo dnf install nodejs npm
```

**Arch Linux:**
```bash
sudo pacman -S nodejs npm
```

**From NodeSource (all distributions):**
```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**Verify Installation:**
```bash
node --version
npm --version
```

#### Running the App

Once you've navigated to the `ir_dr_plan_builder_node` folder (see "How to Navigate to the App Folder" above):

```bash
npm install
npm start
```

The app will print:
```
✅ IR/DR Plan Builder running at http://localhost:3001

📖 Open your browser and visit: http://localhost:3001
```

Open your browser and go to `http://localhost:3001`

---

## Using the Application

### The 6-Step Wizard

1. **Welcome** — Start a new plan or load an existing one
2. **Organization Info** — Enter your organization details
3. **IR Team** — Add team members and contact information
4. **IR Plan** — Define 5-stage incident response procedures
5. **DR Plan** — Define 4-stage disaster recovery procedures
6. **Review** — Preview your plan and export

### Key Features

**Save Plans**
- Click "Save Plan" button
- Plans are saved as JSON files to your Downloads folder
- Can reload anytime using "Load Plan"

**Export**
- **Markdown (.md)** — Professional formatted document
- **PDF** — Ready to print or share

**Dark Theme**
- Professional Catppuccin Mocha color scheme
- Easy on the eyes

---

## Troubleshooting

### Port 3001 Already in Use

If you see `Error: listen EADDRINUSE`, use a different port:

**macOS/Linux:**
```bash
PORT=3002 npm start
```

**Windows (PowerShell):**
```powershell
$env:PORT=3002; npm start
```

**Windows (Command Prompt):**
```cmd
set PORT=3002 && npm start
```

Then visit `http://localhost:3002`

### Browser Won't Open Automatically

If the browser doesn't open, manually visit the URL shown in the terminal:
```
http://localhost:3001
```

### Cannot Save Plans

**macOS/Linux:**
- Ensure you have write access to your Downloads folder:
  ```bash
  ls -la ~/Downloads/
  ```

**Windows:**
- Ensure you have write access to your Downloads folder:
  ```powershell
  icacls "$HOME\Downloads" /grant:r "$env:USERNAME`:`F"
  ```

### npm Installation Fails

**Clear npm cache:**
```bash
npm cache clean --force
npm install
```

**On Windows, try running as Administrator:**
1. Open PowerShell
2. Right-click and select "Run as administrator"
3. Run the commands

### Cannot Find npm or node

1. **Restart your terminal/computer** after installing Node.js
2. **Verify installation:**
   ```bash
   which node
   which npm
   ```
3. **Check your PATH** (macOS/Linux):
   ```bash
   echo $PATH
   ```

---

## File Structure

The key folder you need is `ir_dr_plan_builder_node`. Depending on your system, it might be located in:

- `Documents/Disaster_Recovery/ir_dr_plan_builder_node`
- `Downloads/ir_dr_plan_builder_node`
- `Desktop/ir_dr_plan_builder_node`
- Or anywhere else your system stores it

Inside the `ir_dr_plan_builder_node` folder, you'll find:

```
ir_dr_plan_builder_node/
├── server.js                    ← Express backend
├── package.json                 ← Dependencies
├── package-lock.json            ← Dependency lock file
├── README.md                    ← App documentation
└── public/
    ├── index.html               ← Web interface
    ├── css/style.css            ← Dark theme styling
    └── js/
        ├── app.js               ← Router & state management
        ├── models.js            ← Default plan data
        └── pages/               ← 6 page modules
            ├── welcome.js
            ├── org-info.js
            ├── ir-team.js
            ├── ir-plan.js
            ├── dr-plan.js
            └── review.js
```

**The important part:** You only need to be in the `ir_dr_plan_builder_node` folder and run `npm install` and `npm start`.

---

## System Requirements

| Requirement | Minimum | Recommended |
|-------------|---------|-------------|
| Node.js | v18.0 | v24.0+ |
| npm | v8.0 | v11.0+ |
| RAM | 256 MB | 512 MB+ |
| Disk Space | 100 MB | 500 MB+ |
| Browser | Chrome 90+ / Firefox 88+ / Safari 14+ / Edge 90+ | Latest |

---

## FAQ

**Q: Do I need a login?**
A: No. The application is completely open access. No authentication required.

**Q: Where are my saved plans stored?**
A: In your Downloads folder as JSON files.

**Q: Can I edit plans offline?**
A: The app runs locally on your computer, so yes — completely offline.

**Q: Is my data secure?**
A: Plans are stored only on your local computer. Nothing is sent to external servers.

**Q: Can I run multiple instances?**
A: Yes, but use different ports:
```bash
PORT=3001 npm start  # Terminal 1
PORT=3002 npm start  # Terminal 2
```

**Q: How do I uninstall?**
A: Simply delete the `ir_dr_plan_builder_node` folder.

---

## Support

If you encounter issues:

1. **Check the troubleshooting section** above
2. **Verify Node.js installation:**
   ```bash
   node --version
   npm --version
   ```
3. **Try a different port** (port 3001 might be in use)
4. **Restart your computer** (especially on Windows)
5. **Reinstall dependencies:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

---

## What's Included

- **Professional dark theme** (Catppuccin Mocha)
- **6-step wizard** for comprehensive IR/DR planning
- **Pre-seeded checklists** based on industry best practices
- **Save/load as JSON** for persistence
- **Export to Markdown** for documentation
- **Export to PDF** for printing and sharing
- **Fully responsive** design
- **Zero login** — completely open access
- **Cross-platform** — Mac, Windows, Linux

---

## Next Steps

1. **Install Node.js** — See instructions above for your operating system
2. **Locate the `ir_dr_plan_builder_node` folder** — It could be anywhere on your system
3. **Open a terminal in that folder** — See "How to Navigate to the App Folder" above
4. **Run `npm install`** — Installs all dependencies (one-time only)
5. **Run `npm start`** — Starts the web server
6. **Open `http://localhost:3001`** — In your browser
7. **Start building your IR/DR plan!** — No login required

---

**Version:** 1.0.0  
**Technology:** Node.js + Express + Vanilla JavaScript  
**License:** MIT
