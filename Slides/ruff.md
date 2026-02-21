# Ruff for Python

Here is how to get it installed and running in your workflow.

---

## 1. Installation

Ruff can be installed via standard Python package managers. Since you're often working with different datasets and environments, I recommend installing it in your project's virtual environment.

* **Via pip:**
`pip install ruff`
* **Via uv (Recommended if you want maximum speed):**
`uv tool install ruff@latest`

---

## 2. Core Commands

Ruff splits its duties into **linting** (finding errors) and **formatting** (fixing style).

### The Linter (`ruff check`)

This scans your code for unused imports, undefined variables, and logic errors.

* **Check everything:** `ruff check .`
* **Check and auto-fix:** `ruff check --fix .` (This will automatically remove those pesky unused imports).
* **Watch mode:** `ruff check --watch` (Live feedback as you type).

### The Formatter (`ruff format`)

This is a drop-in replacement for **Black**. It ensures your code follows standard PEP 8 styling.

* **Format everything:** `ruff format .`

---

## 3. Configuration (`pyproject.toml`)

Instead of having five different config files, you can put everything in your `pyproject.toml`. This is especially useful for your academic research projects to ensure consistency across collaborators.

Add this block to your project root:

```toml
[tool.ruff]
# Match the standard line length or your preference
line-length = 88
target-version = "py311"

[tool.ruff.lint]
# Enable specific rule sets
# E/F = Pyflakes/pycodestyle (default)
# I = isort (import sorting)
# B = flake8-bugbear (common bugs)
select = ["E", "F", "I", "B", "UP"]

# Ignore rules you find too pedantic
ignore = ["E501"] 

[tool.ruff.format]
quote-style = "double"
indent-style = "space"

```

---

## 4. Integration with VS Code

Since you use VS Code, you can get real-time highlighting without running the command line:

1. Search the Marketplace for the **Ruff extension** (by Astral Software).
2. In your `settings.json`, set it as the default formatter:
```json
"[python]": {
  "editor.defaultFormatter": "charliermarsh.ruff",
  "editor.formatOnSave": true
}

```
