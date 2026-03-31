'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/lib/store/authStore';
import { getUser, getUserLocations } from '@/lib/api/users';
import { ProfileInfo } from './ProfileInfo';
import { ProfilePlaceholder } from './ProfilePlaceholder';
import styles from './ProfilePageClient.module.css';

const PER_PAGE = 6;

type ProfilePageClientProps = {
  userId: string;
};

export const ProfilePageClient = ({ userId }: ProfilePageClientProps) => {
  const { user: currentUser } = useAuthStore();
  const isOwnProfile = currentUser?._id === userId;
   const [page, setPage] = useState(1);

  const { data: user, isLoading, isError } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUser(userId),
  });

   const { data: locationsData } = useQuery({
    queryKey: ['userLocations', userId, page],
    queryFn: () => getUserLocations(userId, page, PER_PAGE),
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
      />
      <div className={styles.placeholderWrapper}>
  {!isOwnProfile && <h2 className={styles.title}>Локації</h2>}
      {locations.length === 0 ? (
        <ProfilePlaceholder isOwnProfile={isOwnProfile} />
        ) : (
          <>
            {/*<LocationsGrid locations={locations} isOwnProfile={isOwnProfile} /> */}
            {page < totalPages && (
              <button onClick={() => setPage(p => p + 1)}>
                Показати ще
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};