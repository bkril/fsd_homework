#!/bin/bash
# PreToolUse Bash(git commit*) — block commit if lint fails.
# Activated via .claude/settings.json hooks config.
#
# Exit code 2 blocks the commit. Exit code 0 allows it.

# === REPLACE WITH YOUR LINT COMMAND ===
# Examples:
#   yarn lint > /dev/null 2>&1 || { echo "Lint failed — fix before commit" >&2; exit 2; }
#   npm run lint --silent > /dev/null 2>&1 || { echo "Lint failed" >&2; exit 2; }
#   pnpm lint > /dev/null 2>&1 || { echo "Lint failed" >&2; exit 2; }

echo "[hook] pre-commit lint placeholder — edit .claude/hooks/pre-commit-lint.sh"
