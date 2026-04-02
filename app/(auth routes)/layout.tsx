import AuthNav from "@/components/AuthNav/AuthNav";
import css from "./AuthLayout.module.css";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const year = new Date().getFullYear();
  return (
    <div className={css.page}>
      <div className={css.card}>
        <AuthNav />
        {children}
      </div>
      <p className={css.copyright}>&copy; {year} Relax Map</p>
    </div>
  );
};

export default AuthLayout;
