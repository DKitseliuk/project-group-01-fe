'use client';

import { useId } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import styles from './Hero.module.css';

interface HeroSearchFormValues {
  search: string;
}

const initialValues: HeroSearchFormValues = {
  search: '',
};

const validationSchema = Yup.object().shape({
  search: Yup.string().trim().min(1, 'Введіть назву, тип або регіон'),
});

const HeroSearchForm = () => {
  const router = useRouter();
  const fieldId = useId();

  const handleSubmit = (
    values: HeroSearchFormValues,
    actions: FormikHelpers<HeroSearchFormValues>,
  ) => {
    router.push(
      `/locations?search=${encodeURIComponent(values.search.trim())}`,
    );
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={styles.form} role="search" noValidate>
        <label htmlFor={`${fieldId}-search`} className="visually-hidden">
          Пошук місця відпочинку
        </label>
        <Field
          id={`${fieldId}-search`}
          className={styles.input}
          type="search"
          name="search"
          placeholder="Введіть назву, тип або регіон..."
          autoComplete="off"
        />
        <ErrorMessage name="search" component="span" className={styles.error} />
        <button className={styles.button} type="submit">
          Знайти місце
        </button>
      </Form>
    </Formik>
  );
};

export default HeroSearchForm;
