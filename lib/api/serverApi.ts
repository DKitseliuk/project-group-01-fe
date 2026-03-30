import axios from "axios";

export type GetLocationsParams = {
  page?: number;
  perPage?: number;
  search?: string;
  region?: string;
  type?: string;
  sortBy?: string;
  sortOrder?: string;
};

export const getLocationsServer = async ({
  page = 1,
  perPage = 6,
  search = "",
  region = "",
  type = "",
  sortBy = "createdAt",
  sortOrder = "desc",
}: GetLocationsParams) => {
  const { data } = await axios.get("http://localhost:3001/api/locations", {
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
export const getRegionsServer = async () => {
  const { data } = await axios.get(
    "http://localhost:3001/api/categories/regions",
  );
  return data;
};

export const getLocationTypesServer = async () => {
  const { data } = await axios.get(
    "http://localhost:3001/api/categories/location-types",
  );
  return data;
};
