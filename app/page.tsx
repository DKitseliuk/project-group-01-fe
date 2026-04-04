import styles from './HomePage.module.css';

import Hero from '@/components/Hero/Hero';
import AdvantagesBlock from '@/components/AdvantagesBlock/AdvantagesBlock';
import PopularLocationsBlock from '@/components/PopularLocationsBlock/PopularLocationsBlock';
import ReviewsSection from '@/components/ReviewsSection/ReviewsSection';

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { HOME_POPULATION_LOCATIONS_PARAMS } from '@/constants/locations';

import { fetchLocations } from '@/lib/api/serverApi';

export default async function Home() {
  const popularLocations = await fetchLocations(HOME_POPULATION_LOCATIONS_PARAMS);


  const queryClient = new QueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className={styles.main}>
        <Hero />
        <AdvantagesBlock />
        <PopularLocationsBlock locations={popularLocations.locations} />
        <ReviewsSection />
      </main>
    </HydrationBoundary>
  );
}
