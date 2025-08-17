import { Link } from "react-router";
import styles from "./SuccessForm.module.scss";

export const SuccessForm = ({ text }: { text: string }) => {
  return (
    <div className={styles["success-form"]}>
      <span>{text}</span>
      <Link to="/"> на главную</Link>
    </div>
  );
};
