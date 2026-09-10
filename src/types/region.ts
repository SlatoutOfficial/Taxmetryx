export interface MarketCity {
  name: string;
  country: string;
  coordinates: [number, number]; // [longitude, latitude]
  focus: string;
}

export interface Region {
  id: number;
  number: string;
  name: string;
  tagline: string;
  overview: string;
  keyMarkets: string[];
  keyCities: MarketCity[];
  strategicRelevance: string;
  stats: {
    marketsCovered: string;
    bilateralTreaties: string;
    specialization: string;
  };
}
