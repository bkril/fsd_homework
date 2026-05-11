---
description: Audit FSD architecture violations
allowed-tools: Bash(grep *), Read
---

Scan `src/app/` for FSD architectural violations.

Checks:

### 1. Cross-imports between sibling slices in `modules/`
Forbidden — modules must not import each other. They compose at the page level.

### 2. Reverse-layer imports
Imports against the direction `widgets → features → modules → entities → shared`.
For example, `entities/` importing from `modules/` is a violation.

### 3. Barrel bypasses
Imports that reach past a slice's `index.ts` (e.g.
`@/app/modules/foo/internal/bar`). Slices must only be entered via their barrel.

### 4. `export *` in barrels
All barrel exports must be named: `export { X } from "./x"`. `export *` is
forbidden — it breaks tree-shaking and clarity of public API.

### 5. Direct framework-navigation imports in app code
If the project provides a custom navigation layer (e.g. localized `Link` /
`useRouter` in `src/pkg/locale`), imports must come from there rather than the
underlying framework path. Check the project's routing convention.

Output format — one block per violation:

```
[VIOLATION] <category>
File: <path>:<line>
Import: <offending import line>
Fix: <one-line fix>
```

If no violations found, report: `FSD audit passed — no violations found.`

$ARGUMENTS
