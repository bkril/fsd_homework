# Common Pitfalls

## Next.js 16 Breaking Changes

### `params` is now a Promise

```typescript
// Correct (Next.js 16)
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; code: string }>;
}) {
  const { locale, code } = await params;
}

// Wrong (Next.js 14/15 style — throws TypeError in Next.js 16)
export default function Page({ params }: { params: { locale: string } }) {
  const { locale } = params;
}
```

### Middleware file

Middleware in this project is `src/proxy.ts`. NOT `src/middleware.ts`.

---

## FSD Pitfalls

### Cross-module import

```typescript
// Wrong — modules cannot import each other
import { SignModule } from "@/app/modules/sign"; // inside CountriesModule
```

### shadcn/ui path

```typescript
// Correct
import { Button } from "@/pkg/theme/ui/button";

// Wrong — this path does not exist in this project
import { Button } from "@/components/ui/button";
```

### Tailwind config

Tailwind v4 — no `tailwind.config.js`. All tokens defined in:
```css
/* src/config/styles/global.css */
@theme inline {
  --color-primary: ...;
}
```

### Auth: Node.js vs Edge

```typescript
// Node.js runtime (server components, server actions)
const session = await authServer.getSession();

// Edge runtime (middleware src/proxy.ts)
const session = await authServer.getCacheSession();

// Never use getSession() in Edge runtime — it will throw
```

### i18n navigation

```typescript
// Correct
import { Link } from "@/pkg/locale";

// Wrong — misses locale prefix
import Link from "next/link";
```

### React Query in Server Components

```typescript
// Correct — prefetch on server, hydrate on client
const queryClient = getQueryClient();
await queryClient.prefetchQuery({ queryKey: KEY, queryFn: fn });
return <HydrationBoundary state={dehydrate(queryClient)}><Module /></HydrationBoundary>;

// Wrong — hooks do not work in Server Components
const { data } = useCountriesQuery(); // Error
```

### Barrel exports

```typescript
// Correct
export { default as CountryCard } from "./country-card.component";

// Wrong — breaks tree-shaking
export * from "./country-card.component";
```
