const BASE_URL = "http://localhost:3001/api";

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
  const params = new URLSearchParams({
    page: String(page),
    perPage: String(perPage),
    sortBy,
    sortOrder,
  });

  if (search) {
    params.set("search", search);
  }

  if (region) {
    params.set("region", region);
  }

  if (type) {
    params.set("type", type);
  }

  const response = await fetch(`${BASE_URL}/locations?${params.toString()}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch locations");
  }

  return response.json();
};