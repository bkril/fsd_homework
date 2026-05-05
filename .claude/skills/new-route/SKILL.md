---
name: new-route
description: Add a new localized page route to the app. Use when the user asks to add a new page, screen, or route.
user-invocable: true
disable-model-invocation: false
allowed-tools: Read Write Bash
argument-hint: "[route-name] [protected|public|auth]"
---

# New Route

Create a new localized page for route `$ARGUMENTS[0]` in group `$ARGUMENTS[1]`.

## Route groups

| Group | Path | Who can access |
|-------|------|----------------|
| `protected` | `src/app/(web)/[locale]/(protected)/` | Authenticated users only |
| `public` | `src/app/(web)/[locale]/(public)/` | Everyone |
| `auth` | `src/app/(web)/[locale]/(auth)/` | Unauthenticated only (sign-in/sign-up) |

## Step 1 — Create page file

Path: `src/app/(web)/[locale]/($ARGUMENTS[1])/$ARGUMENTS[0]/page.tsx`

**Simple page (no data prefetch):**

```typescript
import { type NextPage } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { __Module__Module } from "@/app/modules/__module__";

interface IProps {
  params: Promise<{ locale: string }>;
}

export const generateMetadata = async (props: IProps) => {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "page_titles" });
  return { title: t("__module__") };
};

const Page: NextPage<Readonly<IProps>> = async (props: IProps) => {
  const { params } = props;
  const { locale } = await params;
  setRequestLocale(locale);
  return <__Module__Module />;
};

export default Page;
```

**Page with React Query prefetch:**

```typescript
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/pkg/rest-api";
import { fetch__Entity__, __ENTITY___QUERY_KEY } from "@/app/entities/api";
import { __Module__Module } from "@/app/modules/__module__";

export const revalidate = 3600;

export const metadata = {
  title: "...",
  description: "...",
};

export default async function __Module__Page() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: __ENTITY___QUERY_KEY,
    queryFn: fetch__Entity__,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <__Module__Module />
    </HydrationBoundary>
  );
}
```

**Page with dynamic param (e.g. `/countries/[code]`):**

```typescript
interface IProps {
  params: Promise<{ locale: string; code: string }>;
}

export default async function Page({ params }: IProps) {
  const { code } = await params;
  // fetch data, call notFound() if missing
}
```

## Step 2 — Create module

Use `/client-structure` to scaffold `src/app/modules/$ARGUMENTS[0]/`.

## Critical rules

- `params` is always a `Promise` in Next.js 16 — always `await params`
- `setRequestLocale(locale)` must be called before any rendering in every page
- `Link`, `useRouter` — always from `@/pkg/locale`, never from `next/`
- All routes are under `[locale]` segment — the URL will be `/en/...` or `/de/...`
- Add `page_titles.<route>` key to both `translations/en.json` and `translations/de.json`
