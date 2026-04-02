import styles from './HomePage.module.css';

import Hero from '@/components/Hero/Hero';
import ReviewsSection from '@/components/ReviewsSection/ReviewsSection';
import AdvantagesBlock from '@/components/AdvantagesBlock/AdvantagesBlock';
import PopularLocationsBlock from '@/components/PopularLocationsBlock/PopularLocationsBlock';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { getReviews } from '@/lib/api/reviews';
import { homeOptionsServer } from '@/lib/queries/homeServer';

export default async function Home() {
  const queryClient = new QueryClient();

  const [reviews] = await Promise.all([
    getReviews(),
    queryClient.prefetchQuery(homeOptionsServer.popularLocations),
  ]);

  return (
    <main className={styles.main}>
      <Hero />
      <AdvantagesBlock />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PopularLocationsBlock />
      </HydrationBoundary>
      <ReviewsSection reviews={reviews} title="Останні відгуки" />
    </main>
  );
}
