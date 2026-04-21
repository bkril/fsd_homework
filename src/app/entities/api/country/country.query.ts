import { useQuery } from "@tanstack/react-query";
import type { ICountry } from "@/app/entities/models";
import { fetchAllCountries } from "./country.api";

export const COUNTRIES_QUERY_KEY = ["countries"] as const;

export function useCountriesQuery() {
  return useQuery<ICountry[]>({
    queryKey: COUNTRIES_QUERY_KEY,
    queryFn: fetchAllCountries,
    staleTime: 60 * 60 * 1000,
  });
}
