'use client';

import Link from 'next/link';
import styles from './ProfilePlaceholder.module.css';

type ProfilePlaceholderProps = {
  isOwnProfile: boolean;
};

export const ProfilePlaceholder = ({ isOwnProfile }: ProfilePlaceholderProps) => {
  return (
     <div className={`${styles.wrapper} ${isOwnProfile ? styles.wrapperOwn : ''}`}>
     <p className={styles.text}>
        {isOwnProfile 
          ? 'Ви ще нічого не публікували, поділіться своєю першою локацією!'
          : 'Цей користувач ще не ділився локаціями'
        }
      </p>
      <Link
        href={isOwnProfile ? "/locations/action/add" : "/"}
        className={`${styles.btn} ${isOwnProfile ? styles.btnOwn : styles.btnPublic}`}
      >
        {isOwnProfile ? 'Поділитись локацією' : 'Назад до локацій'}
      </Link>
    </div>
  );
};