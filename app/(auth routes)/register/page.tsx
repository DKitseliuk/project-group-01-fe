import RegistrationForm from "@/components/RegistrationForm/RegistrationForm";
import css from "./RegisterPage.module.css";

const RegisterPage = () => {
  return (
    <>
      <h1 className={css.title}>Реєстрація</h1>
      <RegistrationForm />
    </>
  );
};

export default RegisterPage;
