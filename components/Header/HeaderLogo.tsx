import Link from 'next/link';
import styles from './Header.module.css';

export const HeaderLogo = ({ onClick }: { onClick?: () => void }) => {
  return (
    <Link href="/" className={styles.logo} aria-label="Relax Map — на головну" onClick={onClick}>
      <svg width="129" height="40" className={styles.logoIcon} aria-hidden="true">
        <use href="/img/icons.svg#icon-logo" />
      </svg>
    </Link>
  );
};