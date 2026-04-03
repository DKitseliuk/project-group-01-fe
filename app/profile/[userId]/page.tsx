import { ProfilePageClient } from '@/components/ProfilePage/ProfilePageClient';
import styles from './ProfileByIdPage.module.css';

import { dehydrate,HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getUserById,getUserLocationsById } from '@/lib/api/serverApi';

type ProfileByIdPageProps = {
  params: Promise<{ userId: string }>;
};

const ProfileByIdPage = async ({ params }: ProfileByIdPageProps) => {
  const { userId } = await params;
  const queryClient = new QueryClient();

   await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['user', userId],
      queryFn: () => getUserById(userId),
    }),
    queryClient.prefetchQuery({
      queryKey: ['userLocations', userId, 1],
      queryFn: () => getUserLocationsById(userId),
    }),
   ]);
  
  return (
    <main className={styles.main}>
      <HydrationBoundary state={dehydrate(queryClient)}>
          <ProfilePageClient userId={userId} />
      </HydrationBoundary>
    </main>
  );
};

export default ProfileByIdPage;