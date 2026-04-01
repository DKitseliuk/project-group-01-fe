

export interface LocationType {
  _id: string;
  type: string;
  slug: string;
  shortDescription: string;
}

export interface Region {
  _id: string;
  region: string;
  slug: string;
  level: string;
  note?: string;
}