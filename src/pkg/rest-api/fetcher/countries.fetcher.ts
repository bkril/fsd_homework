import ky from "ky";

export const countriesFetcher = ky.create({
  prefixUrl: "https://restcountries.com/v3.1",
});
