import { ProfilePageClient } from '@/components/ProfilePage/ProfilePageClient';
import styles from './ProfileByIdPage.module.css';

import { dehydrate,HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getUserById,getUserLocationsById } from '@/lib/api/serverApi';
import { PROFILE_LOCATIONS_DEFAULT_PARAMS } from '@/constants/profile';

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
      queryKey: ['userLocations', userId, PROFILE_LOCATIONS_DEFAULT_PARAMS],
      queryFn: () => getUserLocationsById(userId,
        PROFILE_LOCATIONS_DEFAULT_PARAMS.page,
        PROFILE_LOCATIONS_DEFAULT_PARAMS.perPage),
    }),
   ]);
  
  return (
    <main className={styles.main}>
      <HydrationBoundary state={dehydrate(queryClient)}>
          <ProfilePageClient userId={userId} initialParams={PROFILE_LOCATIONS_DEFAULT_PARAMS} />
      </HydrationBoundary>
    </main>
  );
};

export default ProfileByIdPage;