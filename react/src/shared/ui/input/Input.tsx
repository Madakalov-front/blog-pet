import clsx from "clsx";
import type { InputHTMLAttributes } from "react";
import styles from "./Input.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: "text" | "password" | "search";
  name: string;
  errorText?: string | undefined;
}

export const Input = ({
  type = "text",
  name,
  errorText,
  ...props
}: InputProps) => {
  const modClass = clsx(styles.field__input, styles[`field__input--${type}`]);

  return (
    <div
      className={styles.field}
      {...(errorText && { "data-error-message": errorText })}
    >
      <input
        type={type}
        name={name}
        className={modClass}
        autoComplete="off"
        {...props}
      />
    </div>
  );
};
