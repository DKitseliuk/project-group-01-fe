export interface Location {
  _id: string;
  image: string;
  name: string;
  locationType: string;
  region: string;
  rate: number;
  description: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  ownerId: string;
  feedbacksId: string[];
}
export type FetchLocationsParams = {
  page?: number;
  perPage?: number;
  search?: string;
  region?: string;
  type?: string;
  sortBy?: string;
  sortOrder?: string;
};