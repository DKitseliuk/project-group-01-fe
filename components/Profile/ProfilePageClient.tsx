'use client';

import { useQuery } from '@tanstack/react-query';
import { getUser } from '@/lib/api/users';
import { ProfileInfo } from './ProfileInfo';
import { ProfilePlaceholder } from './ProfilePlaceholder';
import styles from './ProfilePageClient.module.css';

type ProfilePageClientProps = {
  userId: string;
};

export const ProfilePageClient = ({ userId }: ProfilePageClientProps) => {


  const { data: user, isLoading, isError } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUser(userId),
  });

  if (isLoading) return <p>Завантаження...</p>;
  if (isError) return <p>Помилка завантаження профілю</p>;
  if (!user) return null;

  return (
    <div className="container">
      <ProfileInfo
        name={user.name}
        avatarUrl={user.avatarUrl}
        articlesAmount={user.articlesAmount}
      />
      <h2 className={styles.title}>Локації</h2>
      {user.articlesAmount === 0 ? (
        <ProfilePlaceholder />
      ) : (
        //<LocationsGrid />
        <ProfilePlaceholder />
      )}
    </div>
  );
};