import ky from "ky";

// Template: src/pkg/rest-api/fetcher/__entity__.fetcher.ts
// Each API domain gets its own Ky instance with its own prefixUrl
export const __entity__Fetcher = ky.create({
  prefixUrl: "https://api.example.com/v1",
  // timeout: 10_000,
  // headers: { "X-Custom-Header": "value" },
});
