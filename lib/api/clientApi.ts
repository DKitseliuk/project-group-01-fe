import type { Location } from "@/types/location";

export const fetchPopularLocations = async (): Promise<Location[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/locations`);

  if (!res.ok) throw new Error("Error");

  return res.json();
};