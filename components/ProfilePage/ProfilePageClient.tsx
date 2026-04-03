'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/lib/store/authStore';
import { getUser, getUserLocations } from '@/lib/api/clientApi';
import { ProfileInfo } from './ProfileInfo';
import { ProfilePlaceholder } from './ProfilePlaceholder';
import styles from './ProfilePageClient.module.css';
import { LocationsSearchParams } from '@/types/location';
//import LocationsGrid from '@/components/LocationsGrid/LocationsGrid';



type ProfilePageClientProps = {
  userId: string;
  initialParams: LocationsSearchParams;
};

export const ProfilePageClient = ({ userId, initialParams }: ProfilePageClientProps) => {
  const { user: currentUser } = useAuthStore();
  const isOwnProfile = currentUser?._id === userId;
  const [params, setParams] = useState(initialParams);

  const { data: user, isLoading, isError } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUser(userId),
     refetchOnMount: false,
  });

   const { data: locationsData } = useQuery({
    queryKey: ['userLocations', userId, params],
     queryFn: () => getUserLocations(userId, params.page, params.perPage),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Завантаження...</p>;
  if (isError) return <p>Помилка завантаження профілю</p>;
  if (!user) return null;

  const locations = locationsData?.userLocations ?? [];
  const totalPages = locationsData?.totalPages ?? 0;

  return (
    <div className="container">
      <ProfileInfo
        name={user.name}
        avatarUrl={user.avatarUrl}
        articlesAmount={user.articlesAmount}
        isOwnProfile={isOwnProfile}

      />
      <div className={styles.placeholderWrapper}>
  {!isOwnProfile && <h2 className={styles.title}>Локації</h2>}
      {locations.length === 0 ? (
        <ProfilePlaceholder isOwnProfile={isOwnProfile} />
        ) : (
          <>
            {/*<LocationsGrid initialParams={params} userId={userId} /> прописати в LocationsGridProps userId */}
            {(params.page ?? 1) < totalPages && (
              <button onClick={() => setParams(p => ({ ...p, page: (p.page ?? 1) + 1 }))}>
                Показати ще
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};