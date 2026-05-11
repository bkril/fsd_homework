# Project — FSD Architecture

Feature-Sliced Design with strict top-down imports.

## Layers

```
src/app/
├── widgets/    composite UI
├── features/   user interactions
├── modules/    business logic + page composition
├── entities/   models + API + queries
└── shared/     reusable utilities (components, hooks, store, assets)

src/config/    project-level config (env, fonts, global styles)
src/pkg/       third-party integration adapters (auth, db, rest-api, theme, i18n)
```

## Import direction (strict)

```
widgets → features → modules → entities → shared → pkg → config
```

Cross-imports between sibling slices are forbidden. Reverse imports are forbidden.
All slice boundaries cross only through the slice's `index.ts` (public API).

## Conventions

See `/architecture` skill for full reference:
- `references/` — layers, naming, public API, slice structure, component style
- `client-structure/` — runtime patterns (state, forms, data-fetching, UI states)
- `bootstrap/` — step-by-step guides for adding new entities/modules/features/widgets

## Adding a new slice

Use `/architecture` skill. Templates live under `examples/app/` with token
substitution (`__entity__`, `__Entity__`, `__ENTITY__`).
