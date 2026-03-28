'use client';

import Link from 'next/link';
import { useState} from 'react';
import styles from './Header.module.css';
import Image from 'next/image';
import { useAuthStore } from '@/lib/store/authStore';

export const HeaderClient = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, clearIsAuthenticated } = useAuthStore();

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>

        {/* Logo */}
        <Link href="/" className={styles.logo} aria-label="Relax Map — на головну">
          <svg width="129" height="40" className={styles.logoIcon} aria-hidden="true">
            <use href="/img/icons.svg#icon-logo" />
          </svg>
        </Link>

        {/* Desktop nav — 1440px+ */}
        <nav className={styles.desktopNav}>
          <ul className={styles.desktopList}>
                <li>
                  <Link href="/" className={styles.desktopLink}>Головна</Link>
                </li>
            <li>
              <Link href="/locations" className={styles.desktopLink}>
                Місця відпочинку
              </Link>
            </li>
             {isAuthenticated && user && (
                <li>
                  <Link href="/pro" className={styles.desktopLink}>Мій профіль</Link>
                </li>
              )}
          </ul>
        </nav>

           {/* Auth buttons — tablet+, guest only */}
        {!isAuthenticated && (
          <div className={styles.authButtons}>
            <Link href="/login" className={`${styles.authBtn} ${styles.loginBtn}`}>Вхід</Link>
            <Link href="/signup" className={`${styles.authBtn} ${styles.registerBtn}`}>Реєстрація</Link>
          </div>
        )}

        {/* Auth actions — tablet+, user only */}
        {isAuthenticated && user && (
          <div className={styles.authActions}>
             {/* Планшет */}
            <Link href="/locations/add" className={`${styles.publishBtn} ${styles.publishBtnTablet}`}>
              Опублікувати статтю
            </Link>
            {/* Десктоп */}
            <Link href="/locations/add" className={`${styles.publishBtn} ${styles.publishBtnDesktop}`}>
              Поділитись локацією
            </Link>
            <div className={styles.userRowDesktop}>
              <div className={styles.avatar}>
                <Image
                  src={user.avatarUrl}
                  alt={user.name}
                  width={36}
                  height={36}
                />
              </div>
              <span className={styles.userName}>{user.name}</span>
              <div className={styles.userDivider} />
              <button className={styles.logoutBtn}
                type="button"
                aria-label="Вийти"
                onClick={clearIsAuthenticated}>
                <svg width="24" height="24" aria-hidden="true">
                  <use href="/img/icons.svg#icon-logout" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Burger */}
        <button
          className={`${styles.iconBtn} ${styles.burger}`}
          type="button"
          aria-label={isOpen ? 'Закрити меню' : 'Відкрити меню'}
          aria-expanded={isOpen}
          onClick={isOpen ? close : open}
        >
          <svg width="32" height="32" aria-hidden="true">
            <use href={isOpen ? '/img/icons.svg#icon-close' : '/img/icons.svg#icon-menu'} />
          </svg>
        </button>

      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className={styles.mobileMenu}>
          {/* Top bar */}
          <div className={`container ${styles.menuTop}`}>
            <Link href="/" className={styles.logo} onClick={close} aria-label="Relax Map — на головну">
              <svg width="129" height="40" className={styles.logoIcon} aria-hidden="true">
                <use href="/img/icons.svg#icon-logo" />
              </svg>
            </Link>
            <button className={styles.iconBtn} type="button" aria-label="Закрити меню" onClick={close}>
              <svg width="24" height="24" aria-hidden="true">
                <use href="/img/icons.svg#icon-close" />
              </svg>
            </button>
          </div>

          {/* Nav */}
          <nav className={styles.menuNav}>
            <ul className={styles.menuList}>
                <li>
                  <Link href="/" className={styles.menuLink} onClick={close}>Головна</Link>
                </li>
              <li>
                <Link href="/locations" className={styles.menuLink} onClick={close}>Місця відпочинку</Link>
              </li>
              {isAuthenticated && user && (
                <li>
                  <Link href="/pro" className={styles.menuLink} onClick={close}>Мій профіль</Link>
                </li>
              )}
            </ul>
          </nav>

          {/* Guest bottom */}
          {!isAuthenticated && (
            <div className={`container ${styles.menuBottom}`}>
              <Link href="/login" className={`${styles.authBtn} ${styles.loginBtn}`} onClick={close}>Вхід</Link>
              <Link href="/signup" className={`${styles.authBtn} ${styles.registerBtn}`} onClick={close}>Реєстрація</Link>
            </div>
          )}

          {/* Auth bottom */}
          {isAuthenticated && user && (
            <div className={`container ${styles.menuBottomAuth}`}>
              <Link href="/locations/add" className={`${styles.publishBtn} ${styles.publishBtnMobile}`} onClick={close}>
                Опублікувати статтю
              </Link>
              <div className={styles.userRow}>
                <div className={styles.avatar}>
                  <Image
                    src={user.avatarUrl}
                    alt={user.name}
                    width={36}
                    height={36}
                  />
                </div>
                <span className={styles.userName}>{user.name}</span>
                <div className={styles.userDivider} />
                <button className={styles.logoutBtn}
                  type="button"
                  aria-label="Вийти"
                  onClick={clearIsAuthenticated}>
                  <svg width="24" height="24" aria-hidden="true">
                    <use href="/img/icons.svg#icon-logout" />
                  </svg>
                </button>
              </div>
            </div>
          )}

        </div>
      )}
    </header>
  );
};
