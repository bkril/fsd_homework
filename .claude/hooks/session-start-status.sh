#!/bin/bash
# SessionStart — show short git context at session begin.
# Activated via .claude/settings.json hooks config.

if git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
  echo "=== git status ==="
  git status --short
  echo ""
  echo "=== recent commits ==="
  git log --oneline -5
fi
