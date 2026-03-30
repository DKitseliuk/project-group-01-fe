"use client";

import css from "./LoginForm.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
<<<<<<< HEAD
import { login } from "@/lib/api/clientApi";
=======
import { login } from "@/lib/api/auth";

>>>>>>> 3b01dd20c338803679cec7c0177fc8ecc096bf2e
import { useAuthStore } from "@/lib/store/authStore";
import axios from "axios";
import { LoginValues } from "@/types/auth";

const initialValues: LoginValues = {
  email: "",
  password: "",
};
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Введіть коректну електронну адресу")
    .required("Пошта є обовʼязковою"),
  password: Yup.string()
    .min(8, "Пароль має містити щонайменше 8 символів")
    .required("Пароль є обовʼязковим"),
});

const LoginForm = () => {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [error, setError] = useState("");

  const handleSubmit = async (values: LoginValues) => {
    try {
      const data = await login(values);
      setUser(data);
      router.push("/profile");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        setError("Невірна пошта або пароль");
      } else {
        setError("Щось пішло не так");
      }
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
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
        <button className={css.button} type="submit">
          Увійти
        </button>
      </Form>
    </Formik>
  );
};

export default LoginForm;
