# IT 359 Spring 2026

A repo for IT 359 class

---

## Git Command Line Cheat Sheet

This guide covers essential Git and Git LFS commands for beginners.

---

### First-Time Setup

Configure your identity before making any commits (do this once per machine):

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

---

### Getting a Repository

**Clone an existing repo** (download it to your machine):
```bash
git clone https://github.com/username/repo-name.git
```

**Initialize a new repo** in the current folder:
```bash
git init
```

---

### Everyday Workflow

**Check the status** of your working directory:
```bash
git status
```

**See what changed** in your files:
```bash
git diff
```

**Stage files** to be included in your next commit:
```bash
git add filename.txt        # stage a specific file
git add .                   # stage all changed files in current directory
```

**Commit staged changes** with a message:
```bash
git commit -m "Describe what you changed"
```

**Push commits** to the remote repository (e.g., GitHub):
```bash
git push
git push origin branch-name  # push a specific branch
```

**Pull the latest changes** from the remote:
```bash
git pull
```

---

### Branches

**List all branches:**
```bash
git branch          # local branches
git branch -a       # local + remote branches
```

**Create and switch to a new branch:**
```bash
git checkout -b new-branch-name
```

**Switch to an existing branch:**
```bash
git checkout branch-name
```

**Merge a branch** into your current branch:
```bash
git merge branch-name
```

---

### Undoing Things

**Unstage a file** (keep your changes, just remove from staging):
```bash
git restore --staged filename.txt
```

**Discard local changes** to a file (permanently reverts to last commit):
```bash
git restore filename.txt
```

**View commit history:**
```bash
git log
git log --oneline   # compact one-line-per-commit view
```

---

### Git LFS (Large File Storage)

Git LFS is an extension that handles large binary files (images, videos, datasets, etc.) more efficiently than regular Git. Without it, large files bloat your repo history permanently.

**Install Git LFS** (one-time, per machine):
```bash
# On Ubuntu/Debian:
sudo apt install git-lfs

# On macOS (with Homebrew):
brew install git-lfs
```

**Enable Git LFS** in your repo (run once after installing):
```bash
git lfs install
```

**Track a file type** with LFS (e.g., all `.pdf` files):
```bash
git lfs track "*.pdf"
git lfs track "*.zip"
git lfs track "*.png"
```

> This creates/updates a `.gitattributes` file. You must commit that file too.

**Commit the tracking config:**
```bash
git add .gitattributes
git commit -m "Track large files with Git LFS"
```

**Check what is being tracked by LFS:**
```bash
git lfs track
```

**See LFS files in your repo:**
```bash
git lfs ls-files
```

From this point on, any file matching a tracked pattern will automatically be handled by LFS when you `git add` and `git commit` as normal.

---

### Common Mistakes and Fixes

| Problem | Fix |
|---|---|
| Committed to the wrong branch | `git checkout correct-branch` then `git cherry-pick <commit-hash>` |
| Forgot to `git lfs install` before pushing large files | Run `git lfs install`, re-track the file type, re-add and recommit |
| Merge conflict | Edit the conflicted file, remove conflict markers (`<<<<`, `====`, `>>>>`), then `git add` and `git commit` |
| Accidentally staged a file | `git restore --staged filename.txt` |

---

### Quick Reference Card

```
git clone <url>          Download a repo
git status               Show changed files
git add <file>           Stage a file
git commit -m "msg"      Save staged changes
git push                 Upload commits to GitHub
git pull                 Download latest changes
git checkout -b <name>   Create and switch to branch
git log --oneline        View commit history
git lfs install          Enable LFS (once per repo)
git lfs track "*.ext"    Track file type with LFS
```
