import RegistrationForm from '@/components/RegistrationForm/RegistrationForm';
import css from './RegisterPage.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Реєстрація',
  description:
    'Створи акаунт на Relax Map і ділись улюбленими місцями відпочинку в Україні.',
  robots: { index: false },
};

const RegisterPage = () => {
  return (
    <>
      <h1 className={css.title}>Реєстрація</h1>
      <RegistrationForm />
    </>
  );
};

export default RegisterPage;
