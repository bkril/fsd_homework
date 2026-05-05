---
paths: ["src/app/**/*.{ts,tsx}"]
---

# FSD Layer Rules

Import direction: `(web) pages → widgets → features → modules → entities → shared → pkg → config`
Cross-imports between `app/modules/<A>` and `app/modules/<B>` are forbidden.
Use `@/` alias only — no `../../` across layer boundaries.
Public API only via each slice's `index.ts`.

Server Components by default. Add `"use client"` only for state/effects/browser APIs.
`src/pkg/auth/server/` contains `"server-only"` — never import in client components.

Next.js 16: `params` is a `Promise`. Always `const { x } = await params`.
i18n: `Link`, `useRouter`, `usePathname` only from `@/pkg/locale`.
