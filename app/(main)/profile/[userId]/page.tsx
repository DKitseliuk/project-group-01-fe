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
import { Metadata } from 'next';
import { User } from '@/types/user';

type ProfileByIdPageProps = {
  params: Promise<{ userId: string }>;
  searchParams?: Promise<LocationsSearchParams>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ userId: string }>;
}): Promise<Metadata> {
  const { userId } = await params;
  const user: User | null = await getUserById(userId).catch(() => null);

  if (!user) {
    return {
      title: 'Профіль не знайдено',
    };
  }

  return {
    title: `${user.name}`,
    description: `Профіль мандрівника ${user.name} на Relax Map — локації, відгуки та улюблені місця.`,
    openGraph: {
      title: `${user.name} | Relax Map`,
      description: `Профіль мандрівника ${user.name} — локації, відгуки та улюблені місця.`,
      type: 'profile',
      images: user.avatarUrl
        ? [{ url: user.avatarUrl, width: 400, height: 400 }]
        : undefined,
    },
  };
}

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
          .filter(([, v]) => v !== undefined)
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
