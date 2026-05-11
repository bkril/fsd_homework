# Data Fetching

## Query keys

Define each query key as a named export in the entity's `*.query.ts` (or in
its model file), typed with `as const`:

```ts
// src/app/entities/api/<entity>/<entity>.query.ts
export const <ENTITY>_QUERY_KEY = ["<entities>"] as const;
```

Key shape:

- List: `["resource"]`
- Single: `["resource", id]`
- Filtered: `["resource", { filter }]`

## Client query hook (options pattern)

Prefer the v5 `queryOptions()` helper so the same options object can be reused
for client `useQuery`, server `prefetchQuery`, `useQueries`, and cache reads.

```ts
import { queryOptions, useQuery } from "@tanstack/react-query";

import { <ENTITY>_QUERY_KEY } from "@/app/entities/models";

import { fetchAll<Entities> } from "./<entity>.api";

export const <entities>QueryOptions = queryOptions({
  queryKey: <ENTITY>_QUERY_KEY,
  queryFn: fetchAll<Entities>,
  staleTime: 60 * 60 * 1000,
});

export function use<Entities>Query() {
  return useQuery(<entities>QueryOptions);
}
```

- Let the generic be inferred from `queryFn` — don't pass `<TData>` manually.
- Always set `staleTime` — never leave it at `0` for data that doesn't change
  every second.

## Server-side prefetch (framework-agnostic shape)

In server-rendered routes, prefetch on the server and hydrate on the client.
Use the same options object you exported from the entity:

```tsx
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import { getQueryClient } from "@/pkg/rest-api";
import { <entities>QueryOptions } from "@/app/entities/api";

export default async function <Module>Page() {
  const queryClient = getQueryClient();

  try {
    await queryClient.prefetchQuery(<entities>QueryOptions);
  } catch (error) {
    console.error("<Entities> prefetch failed, falling back to client", error);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <<Module>Module />
    </HydrationBoundary>
  );
}
```

The client-side `use<Entities>Query()` will hit the hydrated cache instead of
refetching.

## Direct server fetch (no cache sharing)

For data needed only on the server (not shared with client cache), fetch
directly and pass as props:

```tsx
const <entity> = await fetch<Entity>ById(id);
if (!<entity>) notFound();
return <<Entity>DetailModule <entity>={<entity>} />;
```

## Anti-patterns

```ts
// React Query hook in a Server Component — hooks don't run on the server
const { data } = use<Entities>Query();

// Bare fetch in a client component — bypasses the query cache
const data = await fetch("https://api.example.com/...").then(r => r.json());

// Inline queryKey / queryFn duplicated between client and server — drifts
useQuery({ queryKey: ["<entities>"], queryFn: fetchAll<Entities> });
prefetchQuery({ queryKey: ["<entities>"], queryFn: fetchAll<Entities> });
```
