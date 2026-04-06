'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

import styles from './Header.module.css';
import { useAuthStore } from '@/lib/store/authStore';
import { logout, updateMe } from '@/lib/api/clientApi';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import EditProfileModal from '../EditProfileModal/EditProfileModal';


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

  const setUser = useAuthStore((state) => state.setUser);

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

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

        <button
          type="button"
          className={styles.avatarButton}
          onClick={() => setIsEditProfileOpen(true)}
          aria-label="Редагувати профіль"
        >

          <div className={styles.avatar}>
            <Image
              src={user.avatarUrl || '/default-avatar.png'}
              alt={user.name || 'Аватар користувача'}
              fill
              sizes="32px"
              loading="eager"
            />
          </div>
        </button>

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

      {isEditProfileOpen && (
        <EditProfileModal
          onClose={() => setIsEditProfileOpen(false)}
          userName={user.name}
          userAvatar={user.avatarUrl || ''}
          onSubmit={async ({ name, avatarFile }) => {
            try {
              const updatedUser = await updateMe({
                name,
                avatarFile,
              });

              setUser(updatedUser);
              setIsEditProfileOpen(false);
              toast.success('Профіль оновлено');
            } catch {
              toast.error('Не вдалося оновити профіль');
            }
          }}
        />
      )}

    </div>
  );
};
