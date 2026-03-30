"use client";

import css from "./RegistrationForm.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { RegisterValues } from "@/types/auth";
import { useAuthStore } from "@/lib/store/authStore";
import axios from "axios";
import { register } from "@/lib/api/clientApi";

const initialValues: RegisterValues = {
  name: "",
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Імʼя має містити щонайменше 2 символи")
    .max(50, "Імʼя занадто довге")
    .required("Імʼя є обовʼязковим"),
  email: Yup.string()
    .email("Введіть коректну електронну адресу")
    .required("Пошта є обовʼязковою"),
  password: Yup.string()
    .min(8, "Пароль має містити щонайменше 8 символів")
    .required("Пароль є обовʼязковим"),
});

const RegistrationForm = () => {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [error, setError] = useState("");

  const handleSubmit = async (values: RegisterValues) => {
    try {
      const data = await register(values);
      setUser(data);
      router.push("/profile");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 409) {
        setError("Ця пошта вже використовується");
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
          Імʼя*
          <Field
            className={css.input}
            type="text"
            name="name"
            placeholder="Ваше імʼя"
          />
          <ErrorMessage name="name" component="span" className={css.error} />
        </label>
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
          Зареєструватись
        </button>
      </Form>
    </Formik>
  );
};

export default RegistrationForm;
