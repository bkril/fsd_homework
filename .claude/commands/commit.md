---
description: Guided commit with conventional-commit message
allowed-tools: Bash(git status), Bash(git diff *), Bash(git add *), Bash(git commit *)
---

Stage the relevant changes and create a commit with a conventional-commit message.

Steps:
1. Run `git status` and `git diff` (staged + unstaged) to see what changed.
2. Group the changes into one logical commit. If there are unrelated changes,
   ask the user before bundling them.
3. Draft a message in the format `<type>(<scope>): <description>`:
   - `<type>` — one of `feat`, `fix`, `refactor`, `chore`, `docs`, `test`, `style`, `perf`
   - `<scope>` — optional, lowercase (slice or layer name)
   - `<description>` — imperative mood, lowercase, no trailing period, max 72 chars
4. Show the message to the user and confirm before staging/committing.
5. Stage explicit files (`git add <path>` — never `git add -A`).
6. Run `git commit -m "<message>"`.

$ARGUMENTS
