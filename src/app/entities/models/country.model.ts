// Country list item (used in the list page — filtered fields)
export interface ICountry {
  name: {
    common: string;
    official: string;
  };
  flags: {
    svg: string;
    png: string;
    alt?: string;
  };
  cca3: string;
  capital?: string[];
  region: string;
  subregion?: string;
  population: number;
}

// Full country details (used in the detail page)
export interface ICountryDetail extends ICountry {
  area: number;
  borders?: string[];
  timezones: string[];
  continents: string[];
  languages?: Record<string, string>;
  currencies?: Record<string, { name: string; symbol: string }>;
  latlng: [number, number];
  tld?: string[];
  independent?: boolean;
  unMember?: boolean;
  coatOfArms?: {
    svg?: string;
    png?: string;
  };
}
