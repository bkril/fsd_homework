# Naming Conventions

## Files

| Type | Pattern | Example |
|------|---------|---------|
| React component | `*.component.tsx` | `<element>.component.tsx` |
| Module root | `*.module.tsx` | `<module>.module.tsx` |
| Custom hook | `*.hook.ts` | `use-<action>.hook.ts` |
| Zustand store | `*.store.ts` | `<entity>.store.ts` |
| API functions | `*.api.ts` | `<entity>.api.ts` |
| Query hook | `*.query.ts` | `<entity>.query.ts` |
| Mutation hook | `*.mutation.ts` | `<action>.mutation.ts` |
| Schema (validation) | `*.schema.ts` | `<feature>.schema.ts` |
| TypeScript model | `*.model.ts` | `<entity>.model.ts` |
| Constants | `*.constant.ts` | `<slice>.constant.ts` |
| Service / helper | `*.service.ts` | `<action>.service.ts` |
| Barrel | `index.ts` | `index.ts` |

All filenames use **kebab-case**.

## Directories

All directories use **kebab-case**:

```
modules/<module>/
features/<feature>/
entities/api/<entity>/
```

## TypeScript identifiers

| Category | Prefix | Example |
|----------|--------|---------|
| Interface | `I` | `I<Entity>`, `IProps` |
| Type alias | `T` | `T<Feature>Schema` |
| Enum | `E` | `E<Name>` |
| Store state interface | `IState` | `I<Entity>State` |
| Store full interface | `IStore extends IState` | `I<Entity>Store` |
| Query key constant | `<RESOURCE>_QUERY_KEY` | `<ENTITY>_QUERY_KEY` |

Component identifiers use **PascalCase** and end with the layer suffix:
- `<Element>Component` for `*.component.tsx`
- `<Module>Module` for `*.module.tsx`
- `<Widget>Widget` (or `<Widget>Component` when widgets use `*.component.tsx`)

## Imports

- Use the `@/` path alias for absolute imports.
- Never reach into a slice's internals — always import from its `index.ts`.
- Group imports: external libs → internal aliases → relative paths, separated
  by blank lines.

```ts
import { useState } from "react";
import { z } from "zod";

import { use<Entity>Store } from "@/app/shared/store";
import { Button } from "@/pkg/theme/ui/button";

import { LocalHelper } from "./local-helper";
```
