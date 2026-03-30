import AdvantagesBlock from '@/components/AdvantagesBlock/AdvantagesBlock';
import styles from './HomePage.module.css';
import PopularLocationsBlock from '@/components/PopularLocationsBlock/PopularLocationsBlock';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchLocations } from '@/lib/api/serverApi';
const Home = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['popularLocations'],
    queryFn: fetchLocations,
  });

  return (
    <main className={styles.main}>
      <AdvantagesBlock />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PopularLocationsBlock />
      </HydrationBoundary>
    </main>
  );
};

export default Home;
