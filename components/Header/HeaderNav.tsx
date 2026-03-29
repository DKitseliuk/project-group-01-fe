import Link from 'next/link';
import styles from './Header.module.css';

type HeaderNavProps = {
  isAuthenticated: boolean;
};

export const HeaderNav = ({ isAuthenticated }: HeaderNavProps) => {
  return (
    <nav className={styles.desktopNav}>
      <ul className={styles.desktopList}>
        <li>
          <Link href="/" className={styles.desktopLink}>Головна</Link>
        </li>
        <li>
          <Link href="/locations" className={styles.desktopLink}>Місця відпочинку</Link>
        </li>
        {isAuthenticated && (
          <li>
            <Link href="/profile" className={styles.desktopLink}>Мій профіль</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};