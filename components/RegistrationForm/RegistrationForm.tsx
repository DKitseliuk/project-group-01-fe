"use client";

import { Formik, Form, Field } from "formik";
import { register } from "@/types/auth";
import css from "./RegistrationForm.module.css";
// import { useAuthStore } from "@/lib/store/authStore";

const RegistrationForm = () => {
  // const { setUser } = useAuthStore();
  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" } as register}
      onSubmit={() => {}}
    >
      <Form className={css.form}>
        <label className={css.label}>
          Імʼя*
          <Field
            className={css.input}
            type="text"
            name="name"
            placeholder="Ваше імʼя"
          />
        </label>
        <label className={css.label}>
          Пошта*
          <Field
            className={css.input}
            type="email"
            name="email"
            placeholder="hello@relaxmap.ua"
          />
        </label>
        <label className={css.label}>
          Пароль*
          <Field
            className={css.input}
            type="password"
            name="password"
            placeholder="********"
          />
        </label>
        <button className={css.button} type="submit">
          Зареєструватись
        </button>
      </Form>
    </Formik>
  );
};

export default RegistrationForm;
