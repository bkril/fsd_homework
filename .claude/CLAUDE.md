# fsd_homework — Next.js 16 + FSD Client

> **CRITICAL:** Next.js 16 has breaking API changes. Always read `node_modules/next/dist/docs/`
> before writing any Next.js-specific code. Heed deprecation notices.

## Commands

### Development
| Task | Command |
|------|---------|
| Dev server | `yarn dev` |
| Production build | `yarn build` |
| Start production | `yarn start` |
| Lint | `yarn lint` |

### Testing
| Task | Command |
|------|---------|
| E2E headless | `yarn test:e2e` |
| E2E UI mode | `yarn test:e2e:ui` |

> E2E only. No unit tests exist in this project.

### Git (commit flow)
```bash
yarn lint              # always before committing (enforced via hook in settings.json)
git diff --staged      # review diff manually line by line
git add src/path/file  # always explicit add — never git add -A
git commit -m "feat(scope): description"
```

## Environment Variables

```env
# .env.local
DATABASE_URL=                     # PostgreSQL connection string (required)
BETTER_AUTH_SECRET=               # session signing secret (required)
NEXT_PUBLIC_CLIENT_WEB_URL=       # app URL e.g. http://localhost:3000

# .env.test
TEST_EMAIL=                       # E2E test account email
TEST_PASSWORD=                    # E2E test account password
```

## Architecture (FSD layers)

```
src/app/
├── entities/    → models + API clients + React Query hooks
├── features/    → user interactions (logout, language-switcher)
├── modules/     → business logic + page composition
├── widgets/     → composite UI (header)
└── shared/      → reusable utilities (components, hooks, store, assets)

src/config/      → env vars, fonts, global.css
src/pkg/         → third-party integrations (auth, db, locale, rest-api, theme)
```

Import direction (strict, top → bottom only):
```
(web) pages → widgets → features → modules → entities → shared / pkg / config
```

## Key Paths

| Concern | Path |
|---------|------|
| shadcn/ui components | `src/pkg/theme/ui/` (NOT `components/ui/`) |
| Tailwind theme | `src/config/styles/global.css` (`@theme inline`, no config file) |
| Zustand stores | `src/app/shared/store/` |
| Auth (Node.js runtime) | `authServer.getSession()` from `@/pkg/auth/server` |
| Auth (Edge runtime) | `authServer.getCacheSession()` from `@/pkg/auth/server` |
| Auth client | `authClient` from `@/pkg/auth/client` |
| i18n navigation | `Link`, `useRouter` from `@/pkg/locale` |
| Ky fetchers | `src/pkg/rest-api/fetcher/` (one instance per API domain) |
| Translations | `translations/en.json`, `translations/de.json` |
| E2E tests | `tests/e2e/flows/*.spec.ts` |
| Middleware | `src/proxy.ts` (NOT `src/middleware.ts`) |

## Critical Gotchas

- `params` is a `Promise` in Next.js 16 → always `const { slug } = await params`
- Tailwind v4 — config only in `@theme inline` inside `global.css`
- shadcn/ui is installed at `src/pkg/theme/ui/` via `npx shadcn@latest add <component>`
- All routes must have `[locale]` segment (en / de)
- `Link` and `useRouter` — always from `@/pkg/locale`, never from `next/`

## Rules & Skills

- Commit workflow → `.claude/rules/git-workflow.md`
- FSD layer rules → `.claude/rules/fsd-layers.md`
- Code style → `.claude/rules/code-style.md`
- `/client-structure` → templates for entities, features, modules, widgets
