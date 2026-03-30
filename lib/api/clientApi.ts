import { nextServer } from "@/lib/api/api"; 
import type { Location, FetchLocationsParams } from "@/types/location";
import type { LocationType, Region } from "@/types/categories";

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


export const fetchLocationTypes = async (): Promise<LocationType[]> => {
  const res = await nextServer.get<{ locationTypes: LocationType[] }>("/categories/location-types");
  return res.data.locationTypes;
};

export const fetchRegions = async (): Promise<Region[]> => {
  const res = await nextServer.get<{ regions: Region[] }>("/categories/regions");
  return res.data.regions;
};