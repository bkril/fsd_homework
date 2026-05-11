// React-side query hook for __entity__.
// Example uses @tanstack/react-query. Adapt to your data-fetching lib.

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
