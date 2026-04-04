'use client';

import Link from 'next/link';
import styles from './ProfileLocations.module.css';
import { ReactNode } from 'react';
import { useAuthStore } from '@/lib/store/authStore';

type ProfileLocationsGridProps = {
  children: ReactNode;
  userId: string;
  articlesAmount: number;
};

export const ProfileLocationsGrid = ({
  children,
  userId,
  articlesAmount,
}: ProfileLocationsGridProps) => {
  const currentUser = useAuthStore((state) => state.user);

  const isOwnProfile = currentUser?._id === userId;

  return (
    <section className={styles.section}>
      <div className="container">
        {!isOwnProfile && <h2 className={styles.title}>Локації</h2>}
        {articlesAmount > 0 ? (
          children
        ) : (
          <div className={styles.wrapper}>
            <p className={styles.text}>
              {isOwnProfile
                ? 'Ви ще нічого не публікували, поділіться своєю першою локацією!'
                : 'Цей користувач ще не ділився локаціями'}
            </p>
            <Link
              href={isOwnProfile ? '/locations/action/add' : '/locations'}
              className={`${styles.btn} ${isOwnProfile ? styles.btnOwn : styles.btnPublic}`}
            >
              {isOwnProfile ? 'Поділитись локацією' : 'Назад до локацій'}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
