'use client';

import styles from './LocationsGrid.module.css';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';

import LocationCard from '../LocationCard/LocationCard';
import Pagination from '../Pagination/Pagination';

import { fetchLocations } from '@/lib/api/clientApi';
import { LOCATIONS_PER_PAGE } from '@/constants/pagination';
import type { Location } from '@/types/location';

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

  const page = Number(searchParams.get('page')) || initialPage;

  const filters: Filters = {
    search: searchParams.get('search') || initialFilters.search,
    region: searchParams.get('region') || initialFilters.region,
    type: searchParams.get('type') || initialFilters.type,
    sortBy: searchParams.get('sortBy') || initialFilters.sortBy,
    sortOrder: searchParams.get('sortOrder') || initialFilters.sortOrder,
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

  const { data, isLoading, isError } = useQuery({
    queryKey: [
      'locations',
      {
        page,
        perPage: LOCATIONS_PER_PAGE,
        ...filters,
      },
    ],
    queryFn: () =>
      fetchLocations({
        page,
        perPage: LOCATIONS_PER_PAGE,
        search: filters.search,
        region: filters.region,
        type: filters.type,
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
      }),
  });

  const locations: Location[] = Array.isArray(data?.locations)
    ? data.locations
    : [];

  const totalPages = data?.totalPages ?? 1;

  if (isLoading) {
    return <p className={styles.empty}>Завантаження...</p>;
  }

  if (isError) {
    return <p className={styles.empty}>Помилка завантаження локацій</p>;
  }

  return (
    <>
      {!locations.length ? (
        <p className={styles.empty}>Нічого не знайдено</p>
      ) : (
        <ul className={styles.grid}>
          {locations.map((location) => (
            <LocationCard
              key={location._id}
              location={location}
            />
          ))}
        </ul>
      )}

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={(newPage) =>
          updateQueryParams({
            page: String(newPage),
          })
        }
      />
    </>
  );
}