# Adding a New Entity

An entity describes a domain object: its data shape, how to fetch it, and how
to query it from React.

## Checklist

### 1. Model

Create `src/app/entities/models/<entity>.model.ts`. Define the interface(s)
that describe the entity's shape.

```ts
export interface I__Entity__ {
  id: string;
  // ...
}
```

Register in `src/app/entities/models/index.ts`:

```ts
export { type I__Entity__ } from "./__entity__.model";
```

### 2. API

Create `src/app/entities/api/<entity>/<entity>.api.ts`. Export pure async
functions returning typed data.

```ts
import type { I__Entity__ } from "@/app/entities/models";

export async function fetchAll__Entity__s(): Promise<I__Entity__[]> {
  // Replace with your HTTP client
  const response = await fetch("/api/__entity__s");
  if (!response.ok) throw new Error("Fetch failed");
  return response.json();
}
```

### 3. Query hook (optional — only if using react-query or similar)

Create `src/app/entities/api/<entity>/<entity>.query.ts`:

```ts
import { useQuery } from "@tanstack/react-query";
import type { I__Entity__ } from "@/app/entities/models";
import { fetchAll__Entity__s } from "./__entity__.api";

export const __ENTITY___QUERY_KEY = ["__entity__s"] as const;

export function use__Entity__sQuery() {
  return useQuery<I__Entity__[]>({
    queryKey: __ENTITY___QUERY_KEY,
    queryFn: fetchAll__Entity__s,
    staleTime: 60 * 60 * 1000,
  });
}
```

### 4. Barrel

Create `src/app/entities/api/<entity>/index.ts`:

```ts
export { fetchAll__Entity__s } from "./__entity__.api";
export { use__Entity__sQuery, __ENTITY___QUERY_KEY } from "./__entity__.query";
```

Register in `src/app/entities/api/index.ts`:

```ts
export {
  fetchAll__Entity__s,
  use__Entity__sQuery,
  __ENTITY___QUERY_KEY,
} from "./__entity__";
```

## Reference

See `examples/app/entities/` for the canonical file shapes.
