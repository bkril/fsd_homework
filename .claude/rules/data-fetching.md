---
paths: ["src/app/entities/**/*.ts", "src/app/(web)/**/page.tsx"]
---

# Data Fetching Rules

## Query key convention

Define as a named export const in the entity's query file, typed with `as const`:

```typescript
// src/app/entities/api/country/country.query.ts
export const COUNTRIES_QUERY_KEY = ["countries"] as const;
```

Key naming: `["resource"]` for lists, `["resource", id]` for single items.

## Client-side query hook

```typescript
export function useCountriesQuery() {
  return useQuery<ICountry[]>({
    queryKey: COUNTRIES_QUERY_KEY,
    queryFn: fetchAllCountries,
    staleTime: 60 * 60 * 1000,
  });
}
```

- Always type the generic: `useQuery<TData>`
- Set `staleTime` — never leave it at 0 for data that doesn't change per second
- Export the hook from the entity's `api/index.ts`

## Server-side prefetch pattern

In Server Component pages that need React Query data:

```typescript
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/pkg/rest-api";
import { fetchAllCountries, COUNTRIES_QUERY_KEY } from "@/app/entities/api";
import { CountriesModule } from "@/app/modules/countries";

export const revalidate = 3600;

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

- `getQueryClient()` comes from `@/pkg/rest-api`
- Wrap the module with `<HydrationBoundary state={dehydrate(queryClient)}>`
- Set `export const revalidate` for ISR cache control

## Direct server fetch (no React Query)

For data needed only on the server (not shared with client cache), fetch directly
and pass as props:

```typescript
// page.tsx
const { code } = await params;
const data = await fetchCountryByCode(code);
if (!data) notFound();
return <CountryDetailModule country={data} />;
```

Use `notFound()` from `next/navigation` for missing resources.

## Forbidden

```typescript
// Wrong — hooks don't work in Server Components
const { data } = useCountriesQuery(); // throws

// Wrong — bypasses React Query cache
fetch("https://restcountries.com/...") // inside a client component
```
