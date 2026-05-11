# Naming Conventions

## Files

| Type | Pattern | Example |
|------|---------|---------|
| React component | `*.component.tsx` | `country-card.component.tsx` |
| Module root | `*.module.tsx` | `countries.module.tsx` |
| Custom hook | `*.hook.ts` | `use-sign-out.hook.ts` |
| Zustand store | `*.store.ts` | `user.store.ts` |
| API functions | `*.api.ts` | `country.api.ts` |
| Query hook | `*.query.ts` | `country.query.ts` |
| Mutation hook | `*.mutation.ts` | `sign-in.mutation.ts` |
| Schema (validation) | `*.schema.ts` | `auth.schema.ts` |
| TypeScript model | `*.model.ts` | `country.model.ts` |
| Constants | `*.constant.ts` | `regions.constant.ts` |
| Service / helper | `*.service.ts` | `pagination.service.ts` |
| Barrel | `index.ts` | `index.ts` |

All filenames use **kebab-case**.

## Directories

All directories use **kebab-case**:

```
modules/country-detail/
features/language-switcher/
entities/api/sign-in/
```

## TypeScript identifiers

| Category | Prefix | Example |
|----------|--------|---------|
| Interface | `I` | `ICountry`, `IProps` |
| Type alias | `T` | `TSignInSchema` |
| Enum | `E` | `EAssetImage` |
| Store state interface | `IState` | `IUserState` |
| Store full interface | `IStore extends IState` | `IUserStore` |
| Query key constant | `<RESOURCE>_QUERY_KEY` | `COUNTRIES_QUERY_KEY` |

Component identifiers use **PascalCase** and end with the layer suffix:
- `CountryCardComponent` for `*.component.tsx`
- `CountriesModule` for `*.module.tsx`
- `HeaderWidget` (or `HeaderComponent` when widgets use `*.component.tsx`)

## Imports

- Use the `@/` path alias for absolute imports.
- Never reach into a slice's internals — always import from its `index.ts`.
- Group imports: external libs → internal aliases → relative paths, separated
  by blank lines.

```ts
import { useState } from "react";
import { z } from "zod";

import { useUserStore } from "@/app/shared/store";
import { Button } from "@/pkg/theme/ui/button";

import { LocalHelper } from "./local-helper";
```
