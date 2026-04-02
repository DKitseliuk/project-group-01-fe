import styles from './HomePage.module.css';

import Hero from '@/components/Hero/Hero';
import AdvantagesBlock from '@/components/AdvantagesBlock/AdvantagesBlock';
import PopularLocationsBlock from '@/components/PopularLocationsBlock/PopularLocationsBlock';
import ReviewsBlock from '@/components/ReviewsBlock/ReviewsBlock';

import { HOME_POPULATION_LOCATIONS_PARAMS } from '@/constants/locations';

import { fetchLocations } from '@/lib/api/serverApi';
import { getReviews } from '@/lib/api/serverApi';

export default async function Home() {
  const [popularLocations, popularReviews] = await Promise.all([
    fetchLocations(HOME_POPULATION_LOCATIONS_PARAMS),
    getReviews(),
  ]);

  return (
    <main className={styles.main}>
      <Hero />
      <AdvantagesBlock />
      <PopularLocationsBlock locations={popularLocations} />
      <ReviewsBlock reviews={popularReviews} title="Останні відгуки" />
    </main>
  );
}
