import AuthNav from "@/components/AuthNav/AuthNav";
import css from "./AuthLayout.module.css";
import Link from "next/link";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const year = new Date().getFullYear();
  return (
    <div className={css.page}>
      <Link href="/" className={css.logo} aria-label="Relax Map — на головну">
        <svg
          width="121"
          height="29"
          className={css.logoIcon}
          aria-hidden="true"
        >
          <use href="/img/icons.svg#icon-logo" />
        </svg>
      </Link>
      <a className={css.logo}>Relax Map</a>
      <div className={css.card}>
        <AuthNav />
        {children}
      </div>
      <p className={css.copyright}>&copy; {year} Relax Map</p>
    </div>
  );
};

export default AuthLayout;
