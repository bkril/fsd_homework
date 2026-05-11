// Module-scoped constants. Lift to `shared/` only if reused by other slices.

export const __ITEMS_PER_PAGE__ = 24;

export const __OPTIONS__ = ["one", "two", "three"] as const;

export type T__Option__ = (typeof __OPTIONS__)[number];
