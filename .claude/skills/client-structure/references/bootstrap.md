# Bootstrap — How to Add a New Entity

## Checklist

```bash
# 1. Ky fetcher (only if new API domain)
# File: src/pkg/rest-api/fetcher/__entity__.fetcher.ts
# Register in: src/pkg/rest-api/fetcher/index.ts

# 2. Model
# File: src/app/entities/models/__entity__.model.ts
# Register in: src/app/entities/models/index.ts

# 3. API + Query
# Directory: src/app/entities/api/__entity__/
# Files: __entity__.api.ts, __entity__.query.ts, index.ts
# Register in: src/app/entities/api/index.ts

# 4. Module (page composition)
# Directory: src/app/modules/__module__/
# Files: __module__.module.tsx, index.ts

# 5. Page (route)
# File: src/app/(web)/[locale]/(protected or public)/__route__/page.tsx
```

## SSR Prefetching Pattern

```typescript
import { getQueryClient } from "@/pkg/rest-api";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { EntityModule } from "@/app/modules/entity";
import { ENTITY_QUERY_KEY, fetchAllEntities } from "@/app/entities/api/entity";

export default async function Page() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ENTITY_QUERY_KEY,
    queryFn: fetchAllEntities,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EntityModule />
    </HydrationBoundary>
  );
}
```

## New Locale Page

```typescript
// src/app/(web)/[locale]/(protected)/my-page/page.tsx
import { type NextPage } from "next";

interface IProps {
  params: Promise<{ locale: string }>;
}

const Page: NextPage<Readonly<IProps>> = async (props) => {
  const { locale } = await props.params; // params is always Promise in Next.js 16
  return <MyModule />;
};

export default Page;
```
