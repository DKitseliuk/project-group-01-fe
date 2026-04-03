'use client';

import css from './LoginForm.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { login } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import axios from 'axios';
import { LoginValues } from '@/types/auth';
import toast from 'react-hot-toast';
import { RotatingLines } from 'react-loader-spinner';
import { useSearchParams } from 'next/navigation';

const initialValues: LoginValues = {
  email: '',
  password: '',
};
const validationSchema = Yup.object({
  email: Yup.string()
    .email('Введіть коректну електронну адресу')
    .max(64, 'Пошта має містити не більше 64 символів')
    .required('Пошта є обовʼязковою'),
  password: Yup.string()
    .min(8, 'Пароль має містити щонайменше 8 символів')
    .max(128, 'Пароль має містити не більше 128 символів')
    .required('Пароль є обовʼязковим'),
});

const LoginForm = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');

  const setUser = useAuthStore((state) => state.setUser);
  const [error, setError] = useState('');

  const handleSubmit = async (values: LoginValues) => {
    try {
      const data = await login(values);
      setUser(data);
      toast.success('Ви успішно увійшли!');
      router.push(redirect || '/');
      router.refresh();
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        setError('Невірна пошта або пароль');
        toast.error('Невірна пошта або пароль');
      } else {
        setError('Щось пішло не так');
        toast.error('Щось пішло не так');
      }
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <label className={css.label}>
            Пошта*
            <Field
              className={css.input}
              type="email"
              name="email"
              placeholder="hello@relaxmap.ua"
            />
            <ErrorMessage name="email" component="span" className={css.error} />
          </label>
          <label className={css.label}>
            Пароль*
            <Field
              className={css.input}
              type="password"
              name="password"
              placeholder="********"
            />
            <ErrorMessage
              name="password"
              component="span"
              className={css.error}
            />
          </label>
          {error && <p className={css.error}>{error}</p>}
          <button className={css.button} type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <RotatingLines
                width="20"
                visible={true}
                ariaLabel="rotating-lines-loading"
                strokeColor="white"
              />
            ) : (
              'Увійти'
            )}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
