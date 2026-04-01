"use client";

import Link from "next/link";
import css from "./AuthNav.module.css";
import { usePathname } from "next/navigation";

const AuthNav = () => {
  const pathname = usePathname();
  return (
    <nav className={css.nav}>
      <Link
        className={`${css.link} ${pathname === "/register" ? css.active : ""}`}
        href="/register"
      >
        Реєстрація
      </Link>
      <Link
        className={`${css.link} ${pathname === "/login" ? css.active : ""}`}
        href="/login"
      >
        Вхід
      </Link>
    </nav>
  );
};

export default AuthNav;
