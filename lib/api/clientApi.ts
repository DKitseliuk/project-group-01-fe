import { api } from "@/app/api/api";

export type GetLocationsParams = {
  page?: number;
  perPage?: number;
  search?: string;
  region?: string;
  type?: string;
  sortBy?: string;
  sortOrder?: string;
};

export const getLocationsClient = async ({
  page = 1,
  perPage = 6,
  search = "",
  region = "",
  type = "",
  sortBy = "createdAt",
  sortOrder = "desc",
}: GetLocationsParams) => {
  const { data } = await api.get("/locations", {
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

export const getRegionsClient = async () => {
  const { data } = await api.get("/categories/regions");
  return data;
};

export const getLocationTypesClient = async () => {
  const { data } = await api.get("/categories/location-types");
  return data;
};