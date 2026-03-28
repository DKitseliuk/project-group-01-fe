"use client";
import styles from "./LocationsGrid.module.css";
import { useEffect, useState } from "react";
import LocationCard from "../LocationCard/LocationCard";

type Location = {
  _id: string;
  name: string;
  region: string;
  image: string;
  rate: number;
};

export default function LocationsGrid() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchLocations = async (pageNumber: number) => {
    try {
      setLoading(true);

      const response = await fetch(
        `http://localhost:3001/api/locations?page=${pageNumber}&perPage=6`,
      );

      const data = await response.json();

      setLocations((prev) => {
        const merged =
          pageNumber === 1 ? data.locations : [...prev, ...data.locations];

        return merged.filter(
          (location: Location, index: number, array: Location[]) =>
            index ===
            array.findIndex((item: Location) => item._id === location._id),
        );
      });

      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Failed to fetch locations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations(page);
  }, [page]);

  if (!locations.length && !loading) {
  return <p className={styles.empty}>Нічого не знайдено</p>;
}

  return (
    <>
      <div className={styles.grid}>
        {locations.map((location) => (
          <LocationCard key={location._id} location={location} />
        ))}
      </div>

      {page < totalPages && (
        <button
          className={styles.button}
          onClick={() => setPage((prev) => prev + 1)}
          disabled={loading}
        >
          {loading ? "Loading..." : "Load more"}
        </button>
      )}
    </>
  );
}
