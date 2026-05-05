---
name: client-structure
description: "Templates for creating entities, features, modules, and widgets in this Next.js 16 + FSD project. Use when adding a new FSD slice or integration."
user-invocable: true
allowed-tools: Read Bash Grep
context: fork
---

# Client Structure Templates

Templates live in `examples/app/`. Config and pkg patterns in `config/` and `pkg/`.
Reference documentation in `references/`.

## Token Substitution

| Token | Replace with |
|-------|-------------|
| `__entity__` / `__feature__` / `__module__` / `__widget__` | kebab-case for files/directories |
| `__Entity__` / `__Feature__` / `__Module__` / `__Widget__` | PascalCase for TypeScript identifiers |
| `__ENTITY__` | SCREAMING_SNAKE_CASE for constants |

## Entity (`src/app/entities/`)

Files: `examples/app/entities/`

1. Create Ky fetcher: `src/pkg/rest-api/fetcher/__entity__.fetcher.ts`
   → use `pkg/fetcher/__entity__.fetcher.ts` as template
2. Model: `src/app/entities/models/__entity__.model.ts`
3. API + Query: `src/app/entities/api/__entity__/`
4. Register in `src/app/entities/api/index.ts` and `src/pkg/rest-api/fetcher/index.ts`

## Feature (`src/app/features/`)

Files: `examples/app/features/__feature__/`
- Always `"use client"` at top
- Feature-specific hooks stay alongside as `use-__feature__.hook.ts`

## Module (`src/app/modules/`)

Files: `examples/app/modules/__module__/`
- Server Component by default (no `"use client"`)
- Add `"use client"` only when state/effects/browser APIs are needed
- Private sub-components → `elements/<name>/<name>.component.tsx`

## Widget (`src/app/widgets/`)

Files: `examples/app/widgets/__widget__/`
- `*.component.tsx` (not `.module.tsx`)
- Can import features, must not import modules

## Config Pattern

File: `config/env.config.ts` — Zod validation with `@t3-oss/env-nextjs`

## Auth Pattern

File: `pkg/auth/auth.server.ts` — `authServer` with `getSession` (Node.js) and `getCacheSession` (Edge)

## New Ky Integration

File: `pkg/fetcher/__entity__.fetcher.ts` — `ky.create({ prefixUrl: "..." })`
