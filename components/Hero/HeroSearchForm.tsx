'use client';

import { useId } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { useQuery } from '@tanstack/react-query';
import * as Yup from 'yup';
import styles from './Hero.module.css';
import { categoriesOptionsClient } from '@/lib/queries/categoriesClient';
import { LOCATIONS_DEFAULT_PARAMS } from '@/constants/locations';

interface HeroSearchFormValues {
  search: string;
}

const initialValues: HeroSearchFormValues = {
  search: '',
};

const validationSchema = Yup.object().shape({
  search: Yup.string().trim().min(1, 'Введіть назву, тип або регіон'),
});

function normalize(str: string) {
  return str.trim().toLowerCase();
}

const HeroSearchForm = () => {
  const router = useRouter();
  const fieldId = useId();

  const { data: locationTypes = [] } = useQuery(
    categoriesOptionsClient.locationTypes,
  );
  const { data: regions = [] } = useQuery(categoriesOptionsClient.regions);

  const handleSubmit = (
    values: HeroSearchFormValues,
    actions: FormikHelpers<HeroSearchFormValues>,
  ) => {
    const input = normalize(values.search);

    const matchedType = locationTypes.find((t) => {
      return normalize(t.type) === input;
    });

    const matchedRegion = !matchedType
      ? regions.find((r) => {
          return (
            normalize(r.region).includes(input) ||
            input.includes(normalize(r.region))
          );
        })
      : undefined;

    const filterParam: Record<string, string> = matchedType
      ? { type: matchedType.slug }
      : matchedRegion
        ? { region: matchedRegion.slug }
        : { search: values.search.trim() };

    const params = new URLSearchParams(
      Object.fromEntries(
        Object.entries(LOCATIONS_DEFAULT_PARAMS)
          .filter(([, v]) => v !== undefined)
          .map(([k, v]) => [k, String(v)]),
      ),
    );

    Object.entries(filterParam).forEach(([k, v]) => {
      params.set(k, v);
    });

    router.push(`/locations?${params.toString()}`);
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
