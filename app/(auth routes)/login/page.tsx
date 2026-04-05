import LoginForm from "@/components/LoginForm/LoginForm";
import css from "./LoginPage.module.css";

const LoginPage = () => {
  return (
    <>
      <h1 className={css.title}>Вхід</h1>
      <LoginForm />
    </>
  );
};

export default LoginPage;
