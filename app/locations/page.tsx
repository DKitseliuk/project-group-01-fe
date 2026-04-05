import styles from './LocationsPage.module.css';
import LocationsGrid from '@/components/LocationsGrid/LocationsGrid';
import FilterPanel from '@/components/FilterPanel/FilterPanel';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { fetchLocations } from '@/lib/api/serverApi';

import { LocationsSearchParams } from '@/types/location';
import { LOCATIONS_DEFAULT_PARAMS } from '@/constants/locations';
import { redirect } from 'next/navigation';

type LocationsPageProps = {
  searchParams?: Promise<LocationsSearchParams>;
};

const LocationsPage = async ({ searchParams }: LocationsPageProps) => {
  const incomingParams = await searchParams;

  if (!incomingParams || Object.keys(incomingParams).length === 0) {
    const defaultQuery = new URLSearchParams(
      Object.fromEntries(
        Object.entries(LOCATIONS_DEFAULT_PARAMS)
          .filter(([_, v]) => v !== undefined)
          .map(([k, v]) => [k, String(v)]),
      ),
    ).toString();

    redirect(`/locations?${defaultQuery}`);
  }

  const params: LocationsSearchParams = {
    ...LOCATIONS_DEFAULT_PARAMS,
    ...incomingParams,
  };

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['locations', { ...params }],
    queryFn: () => fetchLocations(params),
  });

  return (
    <main className={styles.main}>
      <div className="container">
        <h1 className={styles.title}>Усі місця відпочинку</h1>

        <HydrationBoundary state={dehydrate(queryClient)}>
          <FilterPanel initialParams={params} />
          <LocationsGrid initialParams={params} />
        </HydrationBoundary>
      </div>
    </main>
  );
};

export default LocationsPage;