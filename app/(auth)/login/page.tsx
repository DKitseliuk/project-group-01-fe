import LoginForm from '@/components/LoginForm/LoginForm';
import css from './LoginPage.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Вхід',
  description:
    'Увійди до свого акаунту Relax Map, щоб додавати локації та залишати відгуки.',
  robots: { index: false },
};

const LoginPage = () => {
  return (
    <>
      <h1 className={css.title}>Вхід</h1>
      <LoginForm />
    </>
  );
};

export default LoginPage;
