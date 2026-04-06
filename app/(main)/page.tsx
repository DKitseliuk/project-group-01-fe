import styles from './HomePage.module.css';

import Hero from '@/components/Hero/Hero';
import AdvantagesBlock from '@/components/AdvantagesBlock/AdvantagesBlock';
import PopularLocationsBlock from '@/components/PopularLocationsBlock/PopularLocationsBlock';
import ReviewsBlock from '@/components/ReviewsBlock/ReviewsBlock';

import { HOME_POPULATION_LOCATIONS_PARAMS } from '@/constants/locations';

import { fetchLocations } from '@/lib/api/serverApi';
import { getReviews } from '@/lib/api/serverApi';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Відкрий для себе Україну',
  description:
    'Тисячі перевірених локацій України з реальними фото та відгуками мандрівників. Озера, гори, замки, море — знайди своє ідеальне місце.',
  keywords: [
    'відпочинок в Україні',
    'локації України',
    'куди поїхати в Україні',
    'туризм',
  ],
  openGraph: {
    title: 'Відкрий для себе Україну | Relax Map',
    description: 'Тисячі перевірених місць відпочинку з фото та відгуками.',
    type: 'website',
    images: [{ url: '/img/Hero/hero-mob@1x.jpg', width: 1200, height: 630 }],
  },
};

export default async function Home() {
  const [popularLocations, popularReviews] = await Promise.all([
    fetchLocations(HOME_POPULATION_LOCATIONS_PARAMS),
    getReviews(),
  ]);

  return (
    <main className={styles.main}>
      <Hero />
      <AdvantagesBlock />
      <PopularLocationsBlock locations={popularLocations.locations} />
      <ReviewsBlock reviews={popularReviews} title="Останні відгуки" />
    </main>
  );
}
