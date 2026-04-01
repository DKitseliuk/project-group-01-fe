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
export interface FetchLocationsParams {
  page?: number;
  perPage?: number;
  search?: string;
  region?: string;
};

export type LocationFormValues = {
  title: string;
  type: string;
  region: string;
  description: string;
  image: File | null;
};