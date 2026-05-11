# State Management — Zustand Stores

## Location

```
src/app/shared/store/<name>.store.ts
src/app/shared/store/index.ts          re-exports public hooks
```

## Naming

- File: `<name>.store.ts` (kebab-case)
- Hook: `use<Name>Store` (PascalCase)
- Interfaces: `IState` (data shape), `IStore extends IState` (data + actions)
- localStorage key (when persisted): `"<name>-store"`

## Pattern

```ts
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface IUser {
  id: string;
  email: string;
  name: string;
}

interface IState {
  user: IUser | null;
}

interface IStore extends IState {
  setUserStore: (value: Partial<IState>) => void;
  clearUserStore: () => void;
}

export const useUserStore = create<IStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUserStore: (value) => set((s) => ({ ...s, ...value })),
        clearUserStore: () => set({ user: null }),
      }),
      {
        name: "user-store",
        version: 1,
        partialize: (s) => ({ user: s.user }),
        migrate: (persisted, version) => {
          if (version < 1) return { user: null };
          return persisted as IState;
        },
      },
    ),
    {
      name: "user-store",
      enabled:
        process.env.NODE_ENV !== "production" &&
        typeof window !== "undefined",
    },
  ),
);
```

## Versioning

Always use `persist` with `version: N` and a `migrate` callback when persisting
to localStorage. When the state shape changes:

1. Bump `version` to `N + 1`
2. Add a branch to `migrate`: handle the previous version (either transform
   the old data or reset to defaults)

This prevents runtime crashes when a user's localStorage contains state from
an older deployment.

## When NOT to use a store

- One-component state → `useState`
- Server-cached data → query library (react-query, swr)
- URL state → router params

Stores are for client-side state shared across unrelated components.
