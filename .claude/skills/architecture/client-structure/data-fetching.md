# Data Fetching

## Query keys

Define each query key as a named export in the entity's `*.query.ts`, typed
with `as const`:

```ts
// src/app/entities/api/country/country.query.ts
export const COUNTRIES_QUERY_KEY = ["countries"] as const;
```

Key shape:

- List: `["resource"]`
- Single: `["resource", id]`
- Filtered: `["resource", { filter }]`

## Client query hook

```ts
import { useQuery } from "@tanstack/react-query";
import type { ICountry } from "@/app/entities/models";
import { fetchAllCountries } from "./country.api";

export function useCountriesQuery() {
  return useQuery<ICountry[]>({
    queryKey: COUNTRIES_QUERY_KEY,
    queryFn: fetchAllCountries,
    staleTime: 60 * 60 * 1000,
  });
}
```

- Always type the generic: `useQuery<TData>`
- Always set `staleTime` — never leave at 0 for data that doesn't change
  per-second

## Server-side prefetch (framework-agnostic shape)

In server-rendered routes, prefetch on the server and hydrate on the client:

```tsx
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/pkg/rest-api";
import { fetchAllCountries, COUNTRIES_QUERY_KEY } from "@/app/entities/api";

export default async function CountriesPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: COUNTRIES_QUERY_KEY,
    queryFn: fetchAllCountries,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CountriesModule />
    </HydrationBoundary>
  );
}
```

The client-side `useCountriesQuery()` will hit the hydrated cache instead of
refetching.

## Direct server fetch (no cache sharing)

For data needed only on the server (not shared with client cache), fetch
directly and pass as props:

```tsx
const country = await fetchCountryByCode(code);
if (!country) notFound();
return <CountryDetailModule country={country} />;
```

## Anti-patterns

```ts
// React Query hook in a Server Component — hooks don't run on the server
const { data } = useCountriesQuery();

// Bare fetch in a client component — bypasses the query cache
const data = await fetch("https://api.example.com/...").then(r => r.json());
```
