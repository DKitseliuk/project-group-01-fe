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
import { Metadata } from 'next';

type LocationsPageProps = {
  searchParams?: Promise<LocationsSearchParams>;
};

export const metadata: Metadata = {
  title: 'Місця відпочинку в Україні',
  description:
    'Переглядай усі локації для відпочинку в Україні — фільтруй за типом, регіоном та зручностями.',
  openGraph: {
    title: 'Місця відпочинку в Україні | Relax Map',
    description:
      'Знайди свою ідеальну локацію серед озер, гір, замків і морського узбережжя.',
    type: 'website',
    url: 'https://project-group-01-fe.vercel.app/locations',
    siteName: 'Relax Map',
    locale: 'uk_UA',
    images: [{ url: '/img/banner.webp', width: 1200, height: 630 }],
  },
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
