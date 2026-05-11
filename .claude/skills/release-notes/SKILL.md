---
name: release-notes
description: Generate release notes from recent commits using conventional-commit grouping. Use when preparing a release, drafting a changelog, or summarizing what changed since a tag.
user-invocable: true
allowed-tools: Bash(git log *), Bash(git tag *), Bash(git describe *), Read
argument-hint: "[since-tag-or-date]"
---

# Release Notes

Generate a changelog-style summary of commits since `$ARGUMENTS` (or the last
tag if `$ARGUMENTS` is empty).

## Steps

1. Resolve the starting point:
   - If `$ARGUMENTS` is provided, use it as a `git log` range start
     (`<tag>..HEAD` or `<date>..HEAD`).
   - Otherwise, find the last tag with `git describe --tags --abbrev=0` and
     use `<lastTag>..HEAD`.
   - If there are no tags, fall back to all commits on the current branch.

2. Fetch the commit list:
   ```
   git log <range> --pretty=format:'%h %s'
   ```

3. Parse each commit using conventional-commit format
   `<type>(<scope>): <description>`. Group by type:

   - ✨ Features (`feat`)
   - 🐛 Fixes (`fix`)
   - 🔧 Refactor (`refactor`)
   - ⚡ Performance (`perf`)
   - 📚 Docs (`docs`)
   - ✅ Tests (`test`)
   - 🧹 Chore (`chore`)
   - 🎨 Style (`style`)

   Commits that don't match conventional format go under "Other".

4. Format each entry: `- <description> (<commit-hash>)`. Strip the `<type>:`
   prefix from the description.

5. Skip release-notes-internal commits (commits whose message starts with
   `chore: release` or contains `[skip notes]`).

6. Print the markdown changelog to the user. Do not write any file unless the
   user explicitly asks.

## Output template

```md
## Release notes — <range>

### ✨ Features
- Add <entity> filter by <attribute> (abc1234)

### 🐛 Fixes
- Handle empty search input (def5678)

### 🔧 Refactor
- Extract pagination helper from <module> module (ghi9012)
```
