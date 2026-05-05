---
paths: ["src/**/*.{ts,tsx}"]
---

# Code Style

**File naming:** `*.component.tsx`, `*.module.tsx`, `*.hook.ts`, `*.store.ts`, `*.api.ts`,
`*.query.ts`, `*.schema.ts`, `*.model.ts`

**TypeScript:** Interface → `I`, Type → `T`, Enum → `E`. Components: `FC<Readonly<IProps>>`.

**Component section order:** `"use client"` → imports → `// interface` → `// component`
→ destructuring → hooks → handlers → `// render`

**shadcn/ui:** `import { Button } from "@/pkg/theme/ui/button"` (NOT `@/components/ui/`)
**Tailwind v4:** use CSS variables — `bg-background`, `text-foreground`. No `tailwind.config.js`.
**Forms:** React Hook Form + Zod factory (`createXyzSchema(messages)`). Always use `<Controller>`.
**Barrel exports:** named exports only. `export *` is forbidden.
**Props destructuring:** always in the component body (`const { x } = props`), not in the function signature.
