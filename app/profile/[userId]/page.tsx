import styles from './ProfilePage.module.css';

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getUserById, getUserLocations } from '@/lib/api/serverApi';
import { PROFILE_LOCATIONS_DEFAULT_PARAMS } from '@/constants/profile';
import { ProfileInfo } from '@/components/ProfileInfo/ProfileInfo';
import { notFound, redirect } from 'next/navigation';
import { LocationsSearchParams } from '@/types/location';
import LocationsGrid from '@/components/LocationsGrid/LocationsGrid';
import { ProfileLocationsGrid } from '@/components/ProfileLocations/ProfileLocations';

type ProfileByIdPageProps = {
  params: Promise<{ userId: string }>;
  searchParams?: Promise<LocationsSearchParams>;
};

const ProfileByIdPage = async ({
  params,
  searchParams,
}: ProfileByIdPageProps) => {
  const { userId } = await params;

  const user = await getUserById(userId);

  if (!user) {
    notFound();
  }

  const incomingParams = await searchParams;

  if (!incomingParams || Object.keys(incomingParams).length === 0) {
    const defaultQuery = new URLSearchParams(
      Object.fromEntries(
        Object.entries(PROFILE_LOCATIONS_DEFAULT_PARAMS)
          .filter(([_, v]) => v !== undefined)
          .map(([k, v]) => [k, String(v)]),
      ),
    ).toString();
    redirect(`/profile/${userId}?${defaultQuery}`);
  }

  const currentParams: LocationsSearchParams = {
    ...PROFILE_LOCATIONS_DEFAULT_PARAMS,
    ...incomingParams,
  };

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['userLocations', userId, { ...currentParams }],
    queryFn: () => getUserLocations(userId, currentParams),
  });

  return (
    <main className={styles.main}>
      <ProfileInfo user={user} />
      <ProfileLocationsGrid
        userId={userId}
        articlesAmount={user.articlesAmount}
      >
        <HydrationBoundary state={dehydrate(queryClient)}>
          <LocationsGrid initialParams={currentParams} userId={userId} />
        </HydrationBoundary>
      </ProfileLocationsGrid>
    </main>
  );
};

export default ProfileByIdPage;
