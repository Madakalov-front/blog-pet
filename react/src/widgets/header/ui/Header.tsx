import { Logo } from "@/widgets/header/ui/internal/Logo/Logo";
import { HeaderAction } from "@/widgets/header/ui/internal/HeaderAction/HeaderAction";
import styles from "./Header.module.scss";

export const Header = () => {
  return (
    <header className={styles["header"]}>
      <div className="container">
        <div className={styles.header__inner}>
          <Logo />
          <HeaderAction />
        </div>
      </div>
    </header>
  );
};
