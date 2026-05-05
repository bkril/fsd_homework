# Git Workflow Rules

## Before Every Commit (required)

```bash
yarn lint              # ESLint must pass (auto-enforced via hook in settings.json)
git diff --staged      # review every diff line manually
```

The hook in `settings.json` automatically blocks `git commit` when `yarn lint` fails.

## Staging (never git add -A)

```bash
# Correct — explicit add
git add src/app/modules/countries/countries.module.tsx
git add src/app/entities/api/country/

# Dangerous — may capture .env or large binaries
git add -A
git add .
```

## Conventional Commits

```
<type>(<scope>): <description>

[optional body]
```

**Types:** `feat`, `fix`, `refactor`, `chore`, `docs`, `test`, `style`, `perf`
**Scope:** FSD layer or feature name (optional)
**Description:** imperative mood, lowercase, no trailing period, max 72 chars

### Examples
```
feat(countries): add region filter with URL state sync
fix(auth): handle expired JWT token in edge middleware
refactor(header): extract user-nav into separate widget element
chore: upgrade react-query to v5.80.0
docs: add .claude/ configuration
test: add E2E flow for country detail page
```

## Forbidden

```bash
git push --force          # on main/master
git reset --hard          # without explicit user request
git commit --no-verify    # blocked in settings.json deny list
git add -A                # may capture secrets
```

## Branch Naming

```
feat/<feature-name>
fix/<bug-description>
chore/<task>
refactor/<area>
```

## Pull Request

- Title: same Conventional Commits format
- Description: what changed + FSD layers affected + test plan
- **Required:** manual `git diff origin/main...HEAD` review before merge
