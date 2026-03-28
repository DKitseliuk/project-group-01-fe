"use client";

import styles from "./LocationsGrid.module.css";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import LocationCard from "../LocationCard/LocationCard";
import FilterPanel from "../FilterPanel/FilterPanel";
import { getLocationsClient } from "@/lib/api/clientApi";

type Location = {
  _id: string;
  name: string;
  region: string;
  image: string;
  rate: number;
  locationType?: string;
};

type Filters = {
  search: string;
  region: string;
  type: string;
  sortBy: string;
  sortOrder: string;
};

type LocationsGridProps = {
  initialPage: number;
  initialFilters: Filters;
};

export default function LocationsGrid({
  initialPage,
  initialFilters,
}: LocationsGridProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page")) || initialPage;

  const filters: Filters = {
    search: searchParams.get("search") || initialFilters.search,
    region: searchParams.get("region") || initialFilters.region,
    type: searchParams.get("type") || initialFilters.type,
    sortBy: searchParams.get("sortBy") || initialFilters.sortBy,
    sortOrder: searchParams.get("sortOrder") || initialFilters.sortOrder,
  };

  const updateQueryParams = (newParams: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    router.push(`?${params.toString()}`);
  };

  const handleFilterChange = (name: string, value: string) => {
    updateQueryParams({
      [name]: value,
      page: "1",
    });
  };

  const { data, isLoading } = useQuery({
    queryKey: ["locations", { page, ...filters }],
    queryFn: () =>
      getLocationsClient({
        page,
        perPage: 6,
        search: filters.search,
        region: filters.region,
        type: filters.type,
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
      }),
  });

  const locations: Location[] = data?.locations || [];
  const totalPages = data?.totalPages || 1;

  const getVisiblePages = (): Array<number | string> => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (page <= 3) {
      return [1, 2, 3, "...", totalPages];
    }

    if (page >= totalPages - 2) {
      return [1, "...", totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, "...", page, "...", totalPages];
  };

  return (
    <>
      <FilterPanel filters={filters} onChange={handleFilterChange} />

      {!locations.length && !isLoading ? (
        <p className={styles.empty}>Нічого не знайдено</p>
      ) : (
        <ul className={styles.grid}>
          {locations.map((location) => (
            <LocationCard key={location._id} location={location} />
          ))}
        </ul>
      )}

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            type="button"
            className={styles.pageButton}
            onClick={() =>
              updateQueryParams({
                page: String(page - 1),
              })
            }
            disabled={page === 1 || isLoading}
          >
            ←
          </button>

          {getVisiblePages().map((item, index) =>
            item === "..." ? (
              <span key={`dots-${index}`} className={styles.dots}>
                ...
              </span>
            ) : (
              <button
                key={item}
                type="button"
                className={page === item ? styles.activePage : styles.pageButton}
                onClick={() =>
                  updateQueryParams({
                    page: String(item),
                  })
                }
                disabled={isLoading}
              >
                {item}
              </button>
            )
          )}

          <button
            type="button"
            className={styles.pageButton}
            onClick={() =>
              updateQueryParams({
                page: String(page + 1),
              })
            }
            disabled={page === totalPages || isLoading}
          >
            →
          </button>
        </div>
      )}
    </>
  );
}