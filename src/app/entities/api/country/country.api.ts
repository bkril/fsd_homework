import { countriesFetcher } from "@/pkg/rest-api/fetcher";
import type { ICountry, ICountryDetail } from "@/app/entities/models";

const FIELDS_LIST = "name,flags,cca3,capital,region,subregion,population";

export async function fetchAllCountries(): Promise<ICountry[]> {
  return countriesFetcher
    .get("all", { searchParams: { fields: FIELDS_LIST } })
    .json<ICountry[]>();
}

export async function fetchCountryByCode(
  code: string
): Promise<ICountryDetail> {
  return countriesFetcher.get(`alpha/${code}`).json<ICountryDetail>();
}
