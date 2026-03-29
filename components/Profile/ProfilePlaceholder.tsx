'use client';

import Link from 'next/link';
import { useAuthStore } from '@/lib/store/authStore';
import styles from './ProfilePlaceholder.module.css';

export const ProfilePlaceholder = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className={styles.wrapper}>
      {isAuthenticated ? (
        <>
          <p className={styles.text}>
            Ви ще нічого не публікували, поділіться своєю першою локацією!
          </p>
          <Link href="/locations/action/add" className={styles.btn}>
            Поділитись локацією
          </Link>
        </>
      ) : (
        <>
          <p className={styles.text}>
            Цей користувач ще не ділився локаціями
          </p>
          <Link href="/" className={styles.btn}>
            Назад до локацій
          </Link>
        </>
      )}
    </div>
  );
};