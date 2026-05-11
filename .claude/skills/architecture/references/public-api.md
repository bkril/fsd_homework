# Public API

Each slice exposes itself only through its `index.ts`. Consumers never reach
into a slice's internal files.

## Correct

```ts
// Consumer
import { CountriesModule } from "@/app/modules/countries";

// modules/countries/index.ts
export { default as CountriesModule } from "./countries.module";
```

## Wrong

```ts
// Bypasses the public API — fragile
import { CountriesModule } from "@/app/modules/countries/countries.module";
import { internalHelper } from "@/app/modules/countries/services/internal";
```

## Rules

1. Every slice has an `index.ts` that names exactly what's public.
2. Only files re-exported from `index.ts` are part of the public API.
3. Inner files (`elements/`, `services/`, constants, schemas) are private to
   the slice unless explicitly re-exported.
4. **Named exports only** — `export *` is forbidden. It breaks tree-shaking
   and makes the public surface opaque.

## When a sub-element needs its own barrel

If a slice has private sub-components in `elements/`, each sub-element has its
own `index.ts`, and the slice's root file imports from the sub-element
directly. There is no aggregator `elements/index.ts`:

```
modules/countries/
├── countries.module.tsx       imports from ./elements/country-card
├── elements/
│   └── country-card/
│       ├── country-card.component.tsx
│       └── index.ts           ← public API of the sub-element
└── index.ts                   ← public API of the slice
```

## Re-exporting types

Types are re-exported with `type`:

```ts
export { type ICountry, type ICountryDetail } from "./country.model";
```

This makes it explicit that the import is type-only and lets TypeScript strip
it at compile time.
