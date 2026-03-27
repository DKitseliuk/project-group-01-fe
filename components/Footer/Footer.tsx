import Link from 'next/link';
import styles from './Footer.module.css';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>

        {/* Logo */}
        <Link href="/" className={styles.logo} aria-label="Relax Map — на головну">
          <svg width="129" height="40" className={styles.logoIcon} aria-hidden="true">
            <use href="/img/icons.svg#icon-logo" />
          </svg>
        </Link>

        {/* Social links */}
        <ul className={styles.socials}>
          <li>
            <a href="https://facebook.com" className={styles.socialLink} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg width="32" height="32" aria-hidden="true">
                <use href="/img/icons.svg#icon-facebook" />
              </svg>
            </a>
          </li>
          <li>
            <a href="https://instagram.com" className={styles.socialLink} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="32" height="32" aria-hidden="true">
                <use href="/img/icons.svg#icon-instagram" />
              </svg>
            </a>
          </li>
          <li>
            <a href="https://x.com" className={styles.socialLink} target="_blank" rel="noopener noreferrer" aria-label="X">
              <svg width="32" height="32" aria-hidden="true">
                <use href="/img/icons.svg#icon-x" />
              </svg>
            </a>
          </li>
          <li>
            <a href="https://youtube.com" className={styles.socialLink} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <svg width="32" height="32" aria-hidden="true">
                <use href="/img/icons.svg#icon-youtube" />
              </svg>
            </a>
          </li>
        </ul>

        {/* Nav */}
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li>
              <Link href="/" className={styles.navLink}>
                Головна
              </Link>
            </li>
            <li>
              <Link href="/places" className={styles.navLink}>
                Місця відпочинку
              </Link>
            </li>
          </ul>
        </nav>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Copyright */}
        <p className={styles.copy}>
          © {currentYear} Природні Мандри. Усі права захищені.
        </p>

      </div>
    </footer>
  );
};