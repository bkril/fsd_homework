# Layers

Feature-Sliced Design uses a strict layered hierarchy. Imports flow in one
direction only.

## Hierarchy

```
widgets → features → modules → entities → shared → pkg → config
```

```
src/app/
├── widgets/    composite UI blocks (header, footer, sidebar)
├── features/   isolated user interactions (logout button, language switcher)
├── modules/    business logic + page composition
├── entities/   domain models, API clients, query hooks
└── shared/     framework-agnostic utilities

src/config/    project-wide config (env vars, fonts, global styles)
src/pkg/       third-party integration adapters (auth, db, i18n, theme)
```

## Import rules

- A layer can import from layers below it.
- A layer cannot import from layers above it.
- Sibling slices inside the same layer cannot import each other.

Example: `modules/<module-a>/` cannot import from `modules/<module-b>/`.
Compose them at the page level (the routing layer).

## Choosing the right layer

| Need | Layer |
|------|-------|
| Reusable button/input with no domain knowledge | `shared/components/` |
| Hook that wraps a browser API or React utility | `shared/hooks/` |
| Domain model + how to fetch it | `entities/` |
| A user-initiated action that mutates state or calls an API | `features/` |
| A page-sized composition of features + entities + UI | `modules/` |
| A reusable composite block (header, page-shell) used across modules | `widgets/` |
| Third-party SDK wrapper (auth, ORM, payment) | `pkg/` |
| Env vars, font loaders, global CSS | `config/` |

## Why this direction

Lower layers know nothing about higher layers. This means:
- `shared/components/Button` can be reused anywhere without coupling.
- `entities/<entity>/` knows nothing about which module displays it — you can
  drop the entity into a different module without changes.
- Pages compose features and modules; modules compose features and entities.
- Cycles are impossible by construction.
