---
description: Find and remove dead code, unused imports, orphan files
allowed-tools: Read, Grep, Glob, Edit
---

Scan the codebase for dead code and propose removals.

Checks:
1. Unused named exports — exported symbols that are not referenced anywhere.
2. Orphan files — files inside a slice that no `index.ts` re-exports and that
   no other file imports directly.
3. Dead imports — `import { X }` where `X` is never used in the file.
4. Empty barrels — `index.ts` files with nothing to export.

Process:
1. Report findings first as a table: `<path>:<line> — <reason>`.
2. Wait for the user to confirm before deleting/editing.
3. Apply removals one slice at a time, never in bulk across the project.

$ARGUMENTS
