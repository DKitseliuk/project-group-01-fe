export interface LocationOwner {
  _id: string;
  name: string;
}

export interface LocationFeedback {
  _id: string;
  rate: number;
  description: string;
  userName: string;
}

export interface Location {
  _id: string;
  image: string;
  name: string;
  locationType: string;
  region: string;
  rate: number;
  description: string;
  coordinates?: {
    lat: number;
    lng?: number;
    lon?: number;
  };
  ownerId: string | LocationOwner;
  feedbacksId: string[] | LocationFeedback[];
}
export interface FetchLocationsParams {
  page?: number;
  perPage?: number;
  search?: string;
  region?: string;
  type?: string;
  sortBy?: string;
  sortOrder?: string;
}
