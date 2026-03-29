"use client";

import { Formik, Form, Field } from "formik";
import { login } from "@/types/auth";
import css from "./LoginForm.module.css";

const LoginForm = () => {
  return (
    <Formik
      initialValues={{ email: "", password: "" } as login}
      onSubmit={() => {}}
    >
      <Form className={css.form}>
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
          Увійти
        </button>
      </Form>
    </Formik>
  );
};

export default LoginForm;
