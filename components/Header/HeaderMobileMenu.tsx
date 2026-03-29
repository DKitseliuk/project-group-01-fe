import Link from 'next/link';
import Image from 'next/image';
import { HeaderLogo } from './HeaderLogo';
import styles from './Header.module.css';
import { User } from '@/types/user'


type HeaderMobileMenuProps = {
  isAuthenticated: boolean;
  user: User | null;
  onClose: () => void;
  onLogout: () => void;
};

export const HeaderMobileMenu = ({ isAuthenticated, user, onClose, onLogout }: HeaderMobileMenuProps) => {
  return (
    <div className={styles.mobileMenu}>

      {/* Top bar */}
      <div className={`container ${styles.menuTop}`}>
        <HeaderLogo onClick={onClose} />
        <button className={styles.iconBtn} type="button" aria-label="Закрити меню" onClick={onClose}>
          <svg width="24" height="24" aria-hidden="true">
            <use href="/img/icons.svg#icon-close" />
          </svg>
        </button>
      </div>

      {/* Nav */}
      <nav className={styles.menuNav}>
        <ul className={styles.menuList}>
          <li>
            <Link href="/" className={styles.menuLink} onClick={onClose}>Головна</Link>
          </li>
          <li>
            <Link href="/locations" className={styles.menuLink} onClick={onClose}>Місця відпочинку</Link>
          </li>
          {isAuthenticated && user && (
            <li>
              <Link href="/pro" className={styles.menuLink} onClick={onClose}>Мій профіль</Link>
            </li>
          )}
        </ul>
      </nav>

      {/* Guest bottom */}
      {!isAuthenticated && (
        <div className={`container ${styles.menuBottom}`}>
          <Link href="/login" className={`${styles.authBtn} ${styles.loginBtn}`} onClick={onClose}>Вхід</Link>
          <Link href="/register" className={`${styles.authBtn} ${styles.registerBtn}`} onClick={onClose}>Реєстрація</Link>
        </div>
      )}

      {/* Auth bottom */}
      {isAuthenticated && user && (
        <div className={`container ${styles.menuBottomAuth}`}>
          <Link href="/locations/action/add" className={`${styles.publishBtn} ${styles.publishBtnMobile}`} onClick={onClose}>
            Опублікувати статтю
          </Link>
          <div className={styles.userRow}>
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
      )}

    </div>
  );
};