import clsx from "clsx";
import styles from "./Buttom.module.scss";

type ButtonProps = {
  type: "button" | "submit" | "reset" | undefined;
  name: string;
  variant?: "default" | "submit";
  size?: "small" | "normal";
  onClick?: () => void;
  disabled?: boolean;
};

export const Button = ({
  type = "button",
  name,
  variant = "default",
  onClick,
  disabled = false,
  size = "small",
}: ButtonProps) => {
  const variantClass = variant && styles[`btn--${variant}`];
  const sizeClass = size && styles[`btn--${size}`];
  return (
    <button
      type={type}
      className={clsx(styles.btn, variantClass, sizeClass)}
      onClick={onClick}
      disabled={disabled}
    >
      {name}
    </button>
  );
};
