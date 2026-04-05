import css from './AuthLayout.module.css';

import { HeaderAuth } from '@/components/Header/HeaderAuth';
import { FooterAuth } from '@/components/Footer/FooterAuth';
import AuthNav from '@/components/AuthNav/AuthNav';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className={css.page}>
      <HeaderAuth />
      <AuthNav />
      <div className={css.card}>{children}</div>
      <FooterAuth />
    </main>
  );
};

export default AuthLayout;
