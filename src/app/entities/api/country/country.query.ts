import { queryOptions, useQuery } from "@tanstack/react-query";

import { COUNTRIES_QUERY_KEY } from "@/app/entities/models";

import { fetchAllCountries } from "./country.api";

export const countriesQueryOptions = queryOptions({
  queryKey: COUNTRIES_QUERY_KEY,
  queryFn: fetchAllCountries,
  staleTime: 60 * 60 * 1000,
});

export function useCountriesQuery() {
  return useQuery(countriesQueryOptions);
}
