# Slice Structure

A slice is a single feature, entity, module, or widget. Each lives in its own
directory under the appropriate layer.

## Anatomy

```
modules/<slice>/
├── <slice>.module.tsx         entry point — the slice's root component
├── <slice>.constant.ts        constants used only by this slice (optional)
├── elements/                  private sub-components (optional)
│   └── <element>/
│       ├── <element>.component.tsx
│       └── index.ts
├── services/                  pure functions / helpers for this slice (optional)
│   ├── <action>.service.ts
│   └── index.ts
└── index.ts                   public API
```

The same shape applies to widgets (`<widget>.component.tsx` as entry) and to
features (`<feature>.component.tsx`).

For entities the structure is slightly different — entities split across
`api/` and `models/` (see `examples/app/entities/`).

## What goes where

| File | Purpose |
|------|---------|
| `<slice>.module.tsx` / `<slice>.component.tsx` | The slice's root React component |
| `<slice>.constant.ts` | Constants (regions, page sizes, hardcoded options) |
| `<slice>.schema.ts` | Validation schema if the slice owns one |
| `elements/<name>/` | Private React sub-components used only by this slice |
| `services/<action>.service.ts` | Pure functions: pagination math, formatters, mappers |
| `services/index.ts` | Re-exports of services |
| `index.ts` | Public API — names the slice's exports |

## Anti-patterns

### Aggregator barrel inside `elements/`

❌ Don't:

```
elements/
├── country-card/
│   └── index.ts
└── index.ts        ← aggregator barrel — unnecessary indirection
```

✅ Do — import directly from the sub-element folder:

```ts
import { CountryCardComponent } from "./elements/country-card";
```

### Inline constants and helpers

❌ Don't keep large constant arrays or helper functions inside the component
file. Extract them:

```
modules/countries/
├── countries.module.tsx
├── countries.constant.ts      ← REGIONS, ITEMS_PER_PAGE, TRegion
└── services/
    └── pagination.service.ts  ← getPageNumbers, TPageItem
```

### Cross-slice imports

❌ Modules cannot import from other modules. If two modules share logic,
extract it to `entities/`, `shared/`, or compose them at the page level.
