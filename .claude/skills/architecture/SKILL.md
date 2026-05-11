---
name: architecture
description: Feature-Sliced Design templates and conventions for React + TypeScript projects. Use when adding a new slice (entity, feature, module, widget), auditing layer violations, or onboarding a new project to this architecture.
user-invocable: true
allowed-tools: Read Bash Grep
---

# Architecture Skill (Feature-Sliced Design)

This skill defines the project architecture and provides templates for adding
new slices. Examples assume **React + TypeScript**. Swap data-fetching, i18n,
auth libs for your stack — the structure stays the same.

## Folders inside this skill

| Folder | Purpose |
|--------|---------|
| `references/` | Canonical FSD rules — read these first |
| `client-structure/` | Runtime patterns (state, forms, data-fetching, UI states) |
| `bootstrap/` | Step-by-step checklists for adding new slices |
| `examples/` | File templates with `__token__` placeholders |

## Token substitution

| Token | Replace with |
|-------|--------------|
| `__entity__` / `__feature__` / `__module__` / `__widget__` | kebab-case for files/directories |
| `__Entity__` / `__Feature__` / `__Module__` / `__Widget__` | PascalCase for identifiers |
| `__ENTITY__` | SCREAMING_SNAKE_CASE for constants |
| `__component__` / `__hook__` / `__store__` / `__action__` | kebab-case for shared / utility names |
| `__integration__` | kebab-case for `pkg/` integrations (auth, db, locale, etc.) |

## Quickstart

- Adding an entity: see `bootstrap/new-entity.md` and `examples/app/entities/`
- Adding a module (page composition): see `bootstrap/new-module.md` and `examples/app/modules/`
- Adding a feature (user interaction): see `bootstrap/new-feature.md` and `examples/app/features/`
- Adding a widget (composite UI block): see `bootstrap/new-widget.md` and `examples/app/widgets/`
- Adding a third-party integration: see `examples/pkg/__integration__/`
- Adding project config (env, fonts, styles): see `examples/config/`

## Architectural invariants

- One direction of imports: `widgets → features → modules → entities → shared → pkg → config`
- Cross-imports between sibling slices in the same layer are forbidden
- Public API only through each slice's `index.ts`
- Named exports only — `export *` is forbidden
- Server Components by default; add `"use client"` only when state, effects, or
  browser APIs are needed

See `references/layers.md` for the full hierarchy with rationale.
