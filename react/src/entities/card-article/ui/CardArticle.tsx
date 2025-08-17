import { Link } from "react-router";
import styles from "./CardArticle.module.scss";
import type { PostProps } from "@/app/reducers";

export const CardArticle = ({
  id,
  title,
  slug,
  content,
  image_url,
  published_at,
}: PostProps) => {
  return (
    <>
      <div className={styles["card-article"]}>
        <div className={styles["card-article__image"]}>
          <img src={image_url} alt={title} loading="lazy" />
        </div>
        <Link
          to={`/article/${slug}/${id}`}
          className={styles["card-article__content"]}
        >
          <h3 className={styles["card-article__title"]}>{title}</h3>
          <p className={styles["card-article__desc"]}>{content}</p>
          <span className={styles["card-article__date"]}>{published_at}</span>
        </Link>
      </div>
    </>
  );
};
