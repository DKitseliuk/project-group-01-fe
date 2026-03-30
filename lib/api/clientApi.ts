import { nextServer } from "@/lib/api/api";
import type { Location, FetchLocationsParams } from "@/types/location";
import { LoginValues, RegisterValues } from "@/types/auth";

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
async function register(payload: RegisterValues) {
  const { data } = await nextServer.post("/register", payload);
  return data;
}

async function login(payload: LoginValues) {
  const { data } = await nextServer.post("/login", payload);
  return data;
}

export { register, login };
