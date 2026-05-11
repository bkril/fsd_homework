#!/bin/bash
# PostToolUse Edit|Write — runs lint on the edited file.
# Activated via .claude/settings.json hooks config.
#
# Reads tool_input JSON from stdin, extracts file_path, runs lint on it
# if the file is a TypeScript/JavaScript source.

FILE=$(jq -r '.tool_input.file_path // ""' 2>/dev/null)
[[ -z "$FILE" ]] && exit 0
[[ ! "$FILE" =~ \.(ts|tsx|js|jsx)$ ]] && exit 0

# === REPLACE WITH YOUR LINT COMMAND ===
# Examples:
#   yarn lint "$FILE" || exit 2
#   npm run lint -- "$FILE" || exit 2
#   pnpm exec eslint "$FILE" || exit 2
#   bunx eslint "$FILE" || exit 2

echo "[hook] lint placeholder for $FILE — edit .claude/hooks/lint-staged.sh"
