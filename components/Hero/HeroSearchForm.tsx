"use client";

import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./Hero.module.css";

const validationSchema = Yup.object({
  search: Yup.string().trim().min(1, "Введіть назву, тип або регіон"),
});

const HeroSearchForm = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: { search: "" },
    validationSchema,
    onSubmit: ({ search }) => {
      router.push(`/locations?search=${encodeURIComponent(search.trim())}`);
    },
  });

  return (
    <form
      className={styles.form}
      role="search"
      onSubmit={formik.handleSubmit}
      noValidate
    >
      <label htmlFor="hero-search" className="visually-hidden">
        Пошук місця відпочинку
      </label>
      <input
        id="hero-search"
        className={styles.input}
        type="search"
        name="search"
        placeholder="Введіть назву, тип або регіон..."
        autoComplete="off"
        value={formik.values.search}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        aria-invalid={
          formik.touched.search && !!formik.errors.search ? "true" : undefined
        }
        aria-describedby={
          formik.touched.search && formik.errors.search
            ? "hero-search-error"
            : undefined
        }
      />
      {formik.touched.search && formik.errors.search && (
        <span id="hero-search-error" className={styles.error} role="alert">
          {formik.errors.search}
        </span>
      )}
      <button className={styles.button} type="submit">
        Знайти місце
      </button>
    </form>
  );
};

export default HeroSearchForm;
