'use client';

import Image from 'next/image';
import styles from './ProfileInfo.module.css';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store/authStore';
import { User } from '@/types/user';

type ProfileInfoProps = {
  user: User;
};

export const ProfileInfo = ({ user }: ProfileInfoProps) => {
  const currentUser = useAuthStore((state) => state.user);

  const isOwnProfile = currentUser?._id === user?._id;

  return (
    <section>
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.avatar}>
            <Image
              src={
                user.avatarUrl ||
                'https://ac.goit.global/fullstack/react/default-avatar.jpg'
              }
              alt={user.name || 'Аватар користувача'}
              fill
              sizes="144px"
              loading="eager"
            />
          </div>
          <div className={styles.infoRow}>
            <div className={styles.info}>
              <p className={styles.name}>{user.name}</p>
              <p className={styles.articles}>Статей: {user.articlesAmount}</p>
            </div>
            {isOwnProfile && (
              <Link
                href={`/profile/${user._id}/edit`}
                className={styles.editBtn}
              >
                Редагувати профіль
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
