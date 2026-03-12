# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Purpose

This is the course repository for **IT 359: Tools and Techniques in Penetration Testing** at Illinois State University (Spring 2026), taught by Dr. Sean Sanders. It contains lecture slides, in-class activity files, lab resources, and final project guidelines.

## Repository Structure

- `Slides/` — Weekly lecture content index (`README.md`) linking to PDFs and Markdown guides
- `In_Class_Activity_Files/` — Hands-on lab activities:
  - `AI_Tutorial/` — Python scripts using the ISU Ollama API (`sushi.it.ilstu.edu`)
  - `Python_Ruff/` — Python linting exercise files
  - `ghidra/` — Reverse engineering setup guide (Android/PE analysis)
- `Project/` — Final project structure template and deliverables rubric (`Deliverables.md`)
- `HTB_Labs/` — HackTheBox lab resources
- `Exam_Files/` — Exam materials
- `Syllabus.md` — Full course schedule, grading, and policies

## Python Code Quality

The course uses **Ruff** for linting and formatting Python code:

```bash
# Lint
ruff check .
ruff check --fix .   # auto-fix

# Format
ruff format .
```

Recommended `pyproject.toml` config:
```toml
[tool.ruff]
line-length = 88
target-version = "py311"

[tool.ruff.lint]
select = ["E", "F", "I", "B", "UP"]
ignore = ["E501"]
```

## AI Tutorial Activity

The `In_Class_Activity_Files/AI_Tutorial/` examples use the ISU-hosted Ollama instance:
- **API endpoint:** `http://sushi.it.ilstu.edu:8080/api/chat/completions`
- **Model:** `translategemma:latest`
- API keys are set directly in the script as `API_key` — students paste their own key

## Ghidra / Reverse Engineering Setup

See `In_Class_Activity_Files/ghidra/README.md` for full setup. Key tools:
```bash
sudo snap install ghidra
sudo apt install apktool pev -y
sudo apt install -y dotnet-sdk-8.0
dotnet tool install -g IlSpyCmd
```
PyxamStore (Xamarin unpacker) is installed from source via a Python venv.

## Final Project Requirements

Defined in `Project/Deliverables.md`. Submissions are a **single public GitHub repo** containing:
1. Source code in `src/` or `app/`
2. `README.md` with video link at top, dependencies, setup, and usage
3. `docs/Final_Writeup_LastName.pdf` — 5–7 page technical report
4. 10–15 minute video walkthrough (YouTube Unlisted or Vimeo)

Grading: Repository (40pts), Writeup (40pts), Video (20pts).

## Course Context

- Students use **HackTheBox VIP+** for labs (Tier 0–2 Starting Point, Intro Red Teaming track)
- Minecraft Java server at `10.110.10.150` (requires ISU VPN off-campus)
- All assignments submitted via Canvas; late/off-platform submissions not accepted
- Current branch `IT_359_Spring_2026` is the working branch; `main` is the base
