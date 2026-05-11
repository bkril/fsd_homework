import { countriesFetcher } from "@/pkg/rest-api/fetcher";
import type { ICountry, ICountryDetail } from "@/app/entities/models";

const FIELDS_LIST = "name,flags,cca3,capital,region,subregion,population";

export async function fetchAllCountries(): Promise<ICountry[]> {
  try {
    return await countriesFetcher
      .get("all", { searchParams: { fields: FIELDS_LIST } })
      .json<ICountry[]>();
  } catch (error) {
    console.error("fetchAllCountries failed", error);
    throw new Error("Failed to fetch countries");
  }
}

export async function fetchCountryByCode(
  code: string
): Promise<ICountryDetail> {
  try {
    return await countriesFetcher
      .get(`alpha/${code}`)
      .json<ICountryDetail>();
  } catch (error) {
    console.error(`fetchCountryByCode(${code}) failed`, error);
    throw new Error(`Failed to fetch country ${code}`);
  }
}
