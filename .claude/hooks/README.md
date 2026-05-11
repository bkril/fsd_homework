# Hooks

Shell scripts referenced from `.claude/settings.json`. Each is a placeholder —
edit the body to plug in your project's actual commands.

## Scripts

| File | Event | Purpose |
|------|-------|---------|
| `lint-staged.sh` | `PostToolUse` on `Edit\|Write` | Lint the file Claude just edited |
| `pre-commit-lint.sh` | `PreToolUse` on `Bash(git commit*)` | Block commit if lint fails |
| `session-start-status.sh` | `SessionStart` | Print git status + recent commits |

## Adapting to your project

Open each `*.sh` and replace the `=== REPLACE ===` block with your lint/test
command. The package manager and command name depend on your stack:

```bash
# Yarn
yarn lint "$FILE"

# npm
npm run lint -- "$FILE"

# pnpm
pnpm exec eslint "$FILE"

# Bun
bunx eslint "$FILE"
```

## Permissions

After cloning to a new project, make the scripts executable:

```bash
chmod +x .claude/hooks/*.sh
```

## Disabling a hook

Either delete the script (the hook in `settings.json` will then fail, which is
visible but non-blocking) or remove the corresponding block from
`settings.json` under `hooks`.

## Exit codes (for command-type hooks)

- `0` — success, allow the action
- `2` — block the action (PreToolUse / PostToolUse can both block)
- any other — non-blocking warning, stderr shown to user
