# Git Command Line Basics

---

## 1. Check for Existing Keys

First, let’s see if your computer already has an SSH key. Open your terminal (or Git Bash on Windows) and type:

`ls -al ~/.ssh`

* **If you see files like `id_rsa.pub` or `id_ed25519.pub`:** You already have a key. You can skip to Step 3.
* **If you see "No such file or directory":** No worries, let’s make one.

## 2. Generate a New SSH Key

We’ll use the **Ed25519** algorithm, which is the current gold standard for security and speed. Run this command, replacing the email with your GitHub/GitLab email:

`ssh-keygen -t ed25519 -C "your_email@example.com"`

1. **Save location:** When it asks "Enter a file in which to save the key," just hit **Enter** to use the default.
2. **Passphrase:** You can add one for extra security, or just hit **Enter** twice for no password (easier for beginners).

## 3. Add the Key to Your SSH Agent

The agent is a background program that manages your keys so you don't have to.

1. **Start the agent:**
`eval "$(ssh-agent -s)"`
2. **Add your key:**
`ssh-add github`

## 4. Add the SSH Key to Your Git Provider

Now you need to tell GitHub (or GitLab/Bitbucket) who you are.

1. **Copy the key to your clipboard:**
* **Mac:** `pbcopy < github.pub`
* **Windows (Git Bash):** `clip < github.pub`
* **Linux:** `cat github.pub` (then copy it manually).


2. **Go to your Provider:** Login to GitHub → Settings → **SSH and GPG keys** → **New SSH Key**.
3. **Paste it:** Give it a title (like "My Laptop") and paste the string you copied.

---

## 5. Basic Git Command Line Workflow

Now that the "handshake" is set up, here is how you actually use Git day-to-day.

### Initialize and Connect

If you have a folder on your computer you want to turn into a repository:

```bash
git init                           # Initialize git in this folder
git remote add origin git@github.com:username/repo-name.git

```

### The "Big Three" Daily Commands

This is the rhythm of 90% of your work:

1. **Check status:** `git status` (See what changed).
2. **Stage changes:** `git add .` (Gather everything for the "snapshot").
3. **Commit:** `git commit -m "Describe what you did"` (Take the snapshot).
4. **Push:** `git push origin main` (Send it to the cloud).

---

## 6. Pro-Tip: Verify Your Connection

To make sure everything is perfect, run this:

`ssh -T git@github.com`

If it says, *"Hi username! You've successfully authenticated,"* you are officially in business.

---

# Additional Git Commands
Adding branching and navigation to your toolkit is where Git starts to feel less like a "save button" and more like a "time machine." These commands allow you to experiment safely without breaking your main project.

---

## 1. Managing Branches (`git branch`)

Think of branches as parallel universes. You can build a new feature in one universe while keeping the "Main" universe stable.

* **List branches:** `git branch` (The one with the `*` is where you are currently).
* **Create a new branch:** `git branch feature-login`
* **Delete a branch:** `git branch -d feature-login` (Use this once the work is merged).

## 2. Navigating the Timeline (`git checkout` / `git switch`)

Once you’ve created a branch, you need to actually "jump" into it.

* **Switch to a branch:** `git checkout feature-login`
> *Note: Modern Git also uses `git switch feature-login`, which is a bit more intuitive.*


* **Shortcut (Create AND Switch):** `git checkout -b new-feature`
This creates the branch and moves you there in one command.
* **Discard local changes:** `git checkout -- filename`
If you've made a mess of a file and want to revert it to the last committed version, this is your "undo" button.

---

## 3. Combining Work (`git merge`)

When your feature is finished and tested, you’ll want to bring those changes back into your main branch.

1. Switch to the target branch: `git checkout main`
2. Pull in the changes: `git merge feature-login`

## 4. Staying Up to Date (`git pull` & `git fetch`)

If you are working with others (or on different machines), you need to grab their changes from the cloud.

* **git fetch:** Downloads changes from GitHub but **doesn't** change your local files yet. It’s a "peek" at what’s new.
* **git pull:** Downloads changes and immediately merges them into your current branch. It’s `fetch` + `merge` combined.

---

## 5. The "I Made a Mistake" Commands

We’ve all been there. Here are the safety nets:

| Command | What it does |
| --- | --- |
| `git log --oneline` | Shows a simplified history of your commits. |
| `git diff` | Shows exactly what lines changed since your last commit. |
| `git reset --soft HEAD~1` | Undoes your last commit but **keeps** your work in the files (great for fixing a typo in a commit message). |
| `git stash` | Temporarily "hides" your uncommitted changes so you can switch branches without committing half-finished work. |
| `git stash pop` | Brings your "hidden" changes back. |

---

