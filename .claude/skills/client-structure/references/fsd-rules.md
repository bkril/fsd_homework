# FSD Import Rules

## Hierarchy (strict top-down only)

```
(web) pages  →  widgets  →  features  →  modules  →  entities  →  shared  →  pkg  →  config
```

Any reverse import (e.g. `shared` importing from `entities`) is **forbidden**.
Cross-imports between sibling slices in `modules/` are **forbidden**.

## Public API via index.ts

```typescript
// Correct — through barrel only
import { CountriesModule } from "@/app/modules/countries";

// Wrong — direct import of internal file
import { CountriesModule } from "@/app/modules/countries/countries.module";
```

## Server / Client Boundary

Default: Server Component (no `"use client"`).
Add `"use client"` only when the file uses:
- `useState`, `useEffect`, `useRef` or other client hooks
- Browser APIs (`window`, `document`, `localStorage`)
- Event handlers directly in JSX
- Client-only libraries

Never add `"use client"` just because a file imports a client component — Next.js handles the boundary automatically.

Files with `"server-only"` (e.g. `src/pkg/auth/server/`) must never be imported in client components.

## i18n Navigation

```typescript
// Always from @/pkg/locale
import { Link, useRouter, usePathname } from "@/pkg/locale";

// Never directly from next/
import Link from "next/link"; // wrong — skips locale prefix
```
