import { nextServer } from "@/lib/api/api";
import type { Location } from "@/types/location";

export type FetchLocationsParams = {
  page?: number;
  perPage?: number;
  search?: string;
  region?: string;
  type?: string;
  sortBy?: string;
  sortOrder?: string;
};

type FetchLocationsResponse = {
  locations: Location[];
  totalPages: number;
  totalItems: number;
  page: number;
  perPage: number;
};

type Region = {
  _id: string;
  slug: string;
  region: string;
  level: string;
  note: string;
};

type LocationType = {
  _id: string;
  slug: string;
  type: string;
  shortDescription: string;
};

export const fetchLocations = async ({
  page = 1,
  perPage = 6,
  search = "",
  region = "",
  type = "",
  sortBy = "createdAt",
  sortOrder = "desc",
}: FetchLocationsParams = {}): Promise<FetchLocationsResponse> => {
  const { data } = await nextServer.get<FetchLocationsResponse>("/locations", {
    params: {
      page,
      perPage,
      search: search || undefined,
      region: region || undefined,
      type: type || undefined,
      sortBy,
      sortOrder,
    },
  });

  return data;
};

export const getRegionsClient = async (): Promise<{ regions: Region[] }> => {
  const { data } = await nextServer.get<{ regions: Region[] }>(
    "/categories/regions"
  );
  return data;
};

export const getLocationTypesClient = async (): Promise<{
  locationTypes: LocationType[];
}> => {
  const { data } = await nextServer.get<{ locationTypes: LocationType[] }>(
    "/categories/location-types"
  );
  return data;
};