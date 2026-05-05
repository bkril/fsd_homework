# Naming Conventions

## Files

| Type | Pattern | Example |
|------|---------|---------|
| React component | `*.component.tsx` | `country-card.component.tsx` |
| Module root | `*.module.tsx` | `countries.module.tsx` |
| Custom hook | `*.hook.ts` | `use-sign-out.hook.ts` |
| Zustand store | `*.store.ts` | `user.store.ts` |
| API functions | `*.api.ts` | `country.api.ts` |
| React Query hook | `*.query.ts` | `country.query.ts` |
| Mutation hook | `*.mutation.ts` | `sign-in.mutation.ts` |
| Zod schema | `*.schema.ts` | `sign.schema.ts` |
| TypeScript model | `*.model.ts` | `country.model.ts` |
| Constants | `*.constant.ts` | `regions.constant.ts` |
| Barrel export | `index.ts` | `index.ts` |

## TypeScript Identifiers

| Category | Prefix | Example |
|----------|--------|---------|
| Interface | `I` | `ICountry`, `IProps` |
| Type alias | `T` | `TSignInSchema` |
| Enum | `E` | `EAssetImage` |
| Store state | `IState` | `IUserState` |
| Store full | `IStore extends IState` | `IUserStore` |
| Query key constant | `SCREAMING_SNAKE_CASE_QUERY_KEY` | `COUNTRIES_QUERY_KEY` |

## Component Section Order

```typescript
"use client"; // only if needed

// 1. external imports
// 2. internal imports

// interface
interface IProps { ... }

// component
const XyzComponent: FC<Readonly<IProps>> = (props) => {
  // destructuring
  // hooks
  // derived values and handlers

  // render
  return (...);
};

export default XyzComponent;
```
