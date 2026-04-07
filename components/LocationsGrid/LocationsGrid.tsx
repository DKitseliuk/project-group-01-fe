'use client';

import styles from './LocationsGrid.module.css';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';

import LocationCard from '../LocationCard/LocationCard';
import Pagination from '../Pagination/Pagination';

import type { Location, LocationsSearchParams } from '@/types/location';
import { parseLocationParams } from '@/helpers/parseLocationsParams';
import { categoriesOptionsClient } from '@/lib/queries/categoriesClient';
import { fetchLocations, getUserLocationsClient } from '@/lib/api/clientApi';
import Loader from '../Loader/Loader';

type LocationsGridProps = {
  initialParams: LocationsSearchParams;
  userId?: string;
};

export default function LocationsGrid({
  initialParams,
  userId,
}: LocationsGridProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentParams = parseLocationParams(
    Object.fromEntries(searchParams.entries()),
    initialParams,
  );

  const updateQueryParams = (newParams: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      }
    });

    router.replace(`?${params.toString()}`);
  };

  const { data: locationTypes = [] } = useQuery(
    categoriesOptionsClient.locationTypes,
  );

  const locationTypeMap = new Map(
    locationTypes.map((type) => [type.slug, type.type]),
  );

  const queryKey = userId
    ? ['userLocations', userId, { ...currentParams }]
    : ['locations', { ...currentParams }];

  const queryFn = userId
    ? () => getUserLocationsClient(userId, currentParams)
    : () => fetchLocations(currentParams);

  const { data, isLoading, isError } = useQuery({
    queryKey,
    queryFn,
    refetchOnMount: false,
  });

  const locations: Location[] = data?.locations || [];

  const updatedLocations = locations.map((location) => ({
    ...location,
    locationTypeLabel: locationTypeMap.get(location.locationType) ?? '',
  }));

  const page = data?.page ?? currentParams?.page ?? 1;
  const totalPages = data?.totalPages ?? 0;

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <p className={styles.empty}>Помилка завантаження локацій</p>;
  }

  return (
    <>
      {!updatedLocations.length ? (
        <p className={styles.empty}>Нічого не знайдено</p>
      ) : (
        <div className={styles.grid}>
          {updatedLocations.map((location) => (
            <LocationCard
              key={location._id}
              location={location}
              canEdit={Boolean(userId)}
            />
          ))}
        </div>
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
