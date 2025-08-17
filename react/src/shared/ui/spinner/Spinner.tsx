import styles from "./Spinner.module.scss";

export const Spinner = () => {
  return (
    <div className={styles["spinner-wrap"]}>
      <span className={styles.spinner}></span>
    </div>
  );
};
