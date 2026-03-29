import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';
import { User } from '@/types/user'


type HeaderActionsProps = {
  isAuthenticated: boolean;
  user: User | null;
  onLogout: () => void;
};

export const HeaderActions = ({ isAuthenticated, user, onLogout }: HeaderActionsProps) => {
  if (!isAuthenticated) {
    return (
      <div className={styles.authButtons}>
        <Link href="/login" className={`${styles.authBtn} ${styles.loginBtn}`}>Вхід</Link>
        <Link href="/register" className={`${styles.authBtn} ${styles.registerBtn}`}>Реєстрація</Link>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className={styles.authActions}>
      {/* Планшет */}
      <Link href="/locations/action/add" className={`${styles.publishBtn} ${styles.publishBtnTablet}`}>
        Опублікувати статтю
      </Link>
      {/* Десктоп */}
      <Link href="/locations/action/add" className={`${styles.publishBtn} ${styles.publishBtnDesktop}`}>
        Поділитись локацією
      </Link>
      <div className={styles.userRowDesktop}>
        <div className={styles.avatar}>
          <Image src={user.avatarUrl} alt={user.name} width={36} height={36} />
        </div>
        <span className={styles.userName}>{user.name}</span>
        <div className={styles.userDivider} />
        <button className={styles.logoutBtn} type="button" aria-label="Вийти" onClick={onLogout}>
          <svg width="24" height="24" aria-hidden="true">
            <use href="/img/icons.svg#icon-logout" />
          </svg>
        </button>
      </div>
    </div>
  );
};