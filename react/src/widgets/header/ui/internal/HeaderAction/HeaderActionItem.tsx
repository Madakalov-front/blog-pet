import type { ReactNode } from "react";
import clsx from "clsx";
import styles from "./HeaderAction.module.scss";

type HeaderActionItemProp = {
  children: ReactNode;
  modClass?: "login" | "back-home" | "new-article" | "users-list";
};

export const HeaderActionItem = ({
  children,
  modClass,
}: HeaderActionItemProp) => {
  return (
    <div
      className={clsx(
        styles["header-action__item"],
        modClass && styles[`header-action__item--${modClass}`]
      )}
    >
      {children}
    </div>
  );
};
