'use client';

import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { registerUser } from '@/lib/api/clientApi';
import styles from './RegistrationForm.module.css';



const initialValues = {
  name: '',
  email: '',
  password: '',
};

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Ім'я має містити щонайменше 2 символи")
    .max(32, "Ім'я має містити не більше 32 символів")
    .required("Ім'я є обов'язковим"),
  email: Yup.string()
    .email('Введіть коректну пошту')
    .required("Пошта є обов'язковою"),
  password: Yup.string()
    .min(8, 'Пароль має містити щонайменше 8 символів')
    .required("Пароль є обов'язковим"),
});

const RegistrationForm = () => {

  const router = useRouter();
    
    const handleSubmit = async (values: typeof initialValues) => {
        try {
            const data = await registerUser(values);
            console.log('Успішна реєстрація', data);
            router.push('/login');
        } catch (error) {
            console.error('Помилка реєстрації', error);
        }
    };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Реєстрація</h2>

       <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >

      <Form className={styles.form}>
        
        <label className={styles.label} htmlFor="name">
          Ім'я*
        </label>

       <Field
            id="name"
            name="name"
            type="text"
            placeholder="Ваше ім'я"
            className={styles.input}
        />
        
        <ErrorMessage
            name="name"
            component="p"
            className={styles.error}
        />

        <label className={styles.label} htmlFor="email">
          Пошта*
        </label>

        <Field
            id="email"
            name="email"
            type="email"
            placeholder="hello@relaxmap.ua"
            className={styles.input}
        />

        <ErrorMessage
            name="email"
            component="p"
            className={styles.error}
        />

        <label className={styles.label} htmlFor="password">
          Пароль*
        </label>

        <Field
            id="password"
            name="password"
            type="password"
            placeholder="********"
            className={styles.input}
         />

         <ErrorMessage
            name="password"
            component="p"
            className={styles.error}
          />
        
        <button type="submit" className={styles.button}>
          Зареєструватись
        </button>

      </Form>
      </Formik>
    </div>
  );
};

export default RegistrationForm;