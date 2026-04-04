'use client';

import Link from 'next/link';
import css from './AuthNav.module.css';
import { usePathname, useSearchParams } from 'next/navigation';

const AuthNav = () => {
  const pathname = usePathname();

  const searchParams = useSearchParams();

  const redirect = searchParams.get('redirect');

  const redirectParam = redirect ? `?redirect=${redirect}` : '';

  return (
    <nav className={css.nav}>
      <Link
        className={`${css.link} ${pathname === '/register' ? css.active : ''}`}
        href={`/register${redirectParam}`}
      >
        Реєстрація
      </Link>
      <Link
        className={`${css.link} ${pathname === '/login' ? css.active : ''}`}
        href={`/login${redirectParam}`}
      >
        Вхід
      </Link>
    </nav>
  );
};

export default AuthNav;
