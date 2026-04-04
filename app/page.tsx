import styles from './HomePage.module.css';

import Hero from "@/components/Hero/Hero";
import ReviewsSection from "@/components/ReviewsSection/ReviewsSection";
import AdvantagesBlock from "@/components/AdvantagesBlock/AdvantagesBlock";
import PopularLocationsBlock from '@/components/PopularLocationsBlock/PopularLocationsBlock';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { fetchLocations } from '@/lib/api/serverApi';

export default async function Home() {

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['popularLocations'],
    queryFn: fetchLocations,
  });

  return (
    <main className={styles.main}>
      <Hero />
      <AdvantagesBlock />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PopularLocationsBlock />
        <ReviewsSection />
      </HydrationBoundary>
    </main>
  );
}
