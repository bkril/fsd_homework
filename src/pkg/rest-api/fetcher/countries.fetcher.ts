import ky from "ky";

export const countriesFetcher = ky.create({
  prefix: "https://restcountries.com/v3.1",
});
