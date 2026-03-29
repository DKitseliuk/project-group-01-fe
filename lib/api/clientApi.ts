import { nextServer } from "@/lib/api/api"; 
import type { Location, FetchLocationsParams } from "@/types/location";


export const fetchLocations = async ({
  page,
  perPage,
  search,
  region,
}: FetchLocationsParams = {}): Promise<Location[]> => {
  const res = await nextServer.get<{ locations: Location[] }>("/locations", {
    params: { page, perPage, search, region },
  });

  return res.data.locations; 
};