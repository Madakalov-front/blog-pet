import { Weather } from "@/widgets/weather";
import styles from "./Footer.module.scss";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footer__inner}>
          {/* <h2>Сделано с ❤️ в Уфе</h2> */}
          <h2>Какое-то описание футера</h2>
          <Weather city="Ufa" />
        </div>
      </div>
    </footer>
  );
};
