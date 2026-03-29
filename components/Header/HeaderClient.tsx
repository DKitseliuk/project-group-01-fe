'use client';

import { useState } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { HeaderLogo } from './HeaderLogo';
import { HeaderNav } from './HeaderNav';
import { HeaderActions } from './HeaderActions';
import { HeaderMobileMenu } from './HeaderMobileMenu';
import styles from './Header.module.css';

export const HeaderClient = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, clearIsAuthenticated } = useAuthStore();

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>

        {/* Logo */}
        <HeaderLogo />

        {/* Desktop nav */}
        <HeaderNav isAuthenticated={isAuthenticated} />

        {/* Auth buttons or actions */}
        <HeaderActions
          isAuthenticated={isAuthenticated}
          user={user}
          onLogout={clearIsAuthenticated}
        />

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
        <HeaderMobileMenu
          isAuthenticated={isAuthenticated}
          user={user}
          onClose={close}
          onLogout={clearIsAuthenticated}
        />
      )}
    </header>
  );
};