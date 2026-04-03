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

export interface FetchLocationsResponse {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  locations: Location[];
}

export type LocationFormValues = {
  name: string;
  locationType: string;
  region: string;
  description: string;
  image: File | null;
  type?: string;
  sortBy?: string;
  sortOrder?: string;
};

export type PopulatedLocation = {
  _id?: string;
  name?: string;
};

export type LocationsSearchParams = {
  page?: number;
  perPage?: number;
  search?: string;
  region?: string;
  type?: string;
  sortBy?: string;
  sortOrder?: string;
};

export type LocationsSearchParamsURL = {
  page?: string;
  perPage?: string;
  search?: string;
  region?: string;
  type?: string;
  sortBy?: string;
  sortOrder?: string;
};

export type CreateLocationPayload = {
  title: string;
  type: string;
  region: string;
  description: string;
  images: File | null;
};

export type CreateLocationResponse = {
  _id: string;
  title: string;
  type: string;
  region: string;
  description: string;
  images?: string;
};
