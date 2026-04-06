'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';
import { useAuthStore } from '@/lib/store/authStore';
import { logout } from '@/lib/api/clientApi';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import { useState } from 'react';

export const HeaderActions = () => {
  const pathname = usePathname();
  const setRedirectAfterAuth = useAuthStore(
    (state) => state.setRedirectAfterAuth,
  );

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const onLogout = () => setIsConfirmationOpen(true);

  if (!isAuthenticated) {
    return (
      <div className={styles.authButtons}>
        <Link
          href="/login"
          className={`${styles.authBtn} ${styles.loginBtn}`}
          onClick={() => setRedirectAfterAuth(pathname)}
        >
          Вхід
        </Link>
        <Link
          href="/register"
          className={`${styles.authBtn} ${styles.registerBtn}`}
          onClick={() => setRedirectAfterAuth(pathname)}
        >
          Реєстрація
        </Link>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className={styles.authActions}>
      {/* Планшет */}
      <Link
        href="/locations/action/add"
        className={`${styles.publishBtn} ${styles.publishBtnTablet}`}
      >
        Опублікувати статтю
      </Link>
      {/* Десктоп */}
      <Link
        href="/locations/action/add"
        className={`${styles.publishBtn} ${styles.publishBtnDesktop}`}
      >
        Поділитись локацією
      </Link>
      <div className={styles.userRowDesktop}>
        <Link href={`/profile/${user._id}/edit`} className={styles.userLink}>
          <div className={styles.avatar}>
            <Image
              src={user.avatarUrl}
              alt={user.name}
              fill
              sizes="32px"
              loading="eager"
            />
          </div>
        </Link>
        <Link href={`/profile/${user._id}`} className={styles.userLink}>
          <span className={styles.userName}>{user.name}</span>
        </Link>
        <div className={styles.userDivider} />
        <button
          className={styles.logoutBtn}
          type="button"
          aria-label="Вийти"
          onClick={onLogout}
        >
          <svg width="24" height="24" aria-hidden="true">
            <use href="/img/icons.svg#icon-logout" />
          </svg>
        </button>
      </div>
      {isConfirmationOpen && (
        <ConfirmationModal
          onClose={() => setIsConfirmationOpen(false)}
          onConfirm={async () => {
            try {
              await logout();
            } finally {
              clearIsAuthenticated();
              setIsConfirmationOpen(false);
            }
          }}
        />
      )}
    </div>
  );
};
