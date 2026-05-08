export const REGIONS = [
  "All",
  "Africa",
  "Americas",
  "Asia",
  "Europe",
  "Oceania",
  "Antarctic",
] as const;

export type TRegion = (typeof REGIONS)[number];

export const ITEMS_PER_PAGE = 24;
