
import { cookies } from "next/headers";
import { nextServer } from "@/lib/api/api";
import type { Location } from "@/types/location";


export const fetchLocations = async (): Promise<Location[]> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<{ locations: Location[] }>("/locations", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data.locations; 
};