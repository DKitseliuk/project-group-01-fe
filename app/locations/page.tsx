import { useEffect, useState } from "react";
import { fetchLocations } from "@/lib/api/serverApi";
import type { Location } from "@/types/location";
import LocationCard from "@/components/LocationCard/LocationCard";

export default function LocationsPage() {
  const [locations, setLocations] = useState<Location[]>([]); 

  useEffect(() => {
    fetchLocations().then(setLocations);
  }, []);

  return (
    <div>
      {locations.map((loc) => (
        <LocationCard key={loc._id} location={loc} /> 
      ))}
    </div>
  );
}