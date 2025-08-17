import { type ReactNode } from "react";
import { Link } from "react-router";
import clsx from "clsx";
import styles from "./IconLink.module.scss";

type IconLinkProps = {
  to: string;
  icon: ReactNode;
  className?: "login" | "back-link" | "new-article" | "users-list";
};

export const IconLink = ({ to, icon, className }: IconLinkProps) => {
  const modefClass = className ? styles[`link-icon--${className}`] : null;

  return (
    <Link to={to} className={clsx(styles["link-icon"], modefClass)}>
      {icon}
    </Link>
  );
};
