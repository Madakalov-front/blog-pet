import { Link } from "react-router";
import styles from "./Logo.module.scss";

export const Logo = () => {
  return (
    <div className={styles.logo}>
      <Link to="/" className={styles.logo__img}>
        <img src="/img/icon/logo.svg" alt="логотип" />
      </Link>
      <div className={styles.logo__content}>
        {/* @Madakalov <br /> FrontendDeveloper */}
        Какое-то описание <br /> шапки
      </div>
    </div>
  );
};
