import { CardArticle } from "@/entities";
import { useGetPostsQuery } from "@/app/reducers";
import { usePostQueryParams } from "@/pages/main/ui/internal/usePostQueryParams";
import styles from "./CardGrid.module.scss";
import clsx from "clsx";

export const CardGrid = () => {
  const { current_page, limit_card, searchParams, setSearchParams } =
    usePostQueryParams();
  const { data, error, isSuccess } = useGetPostsQuery({
    current_page: current_page,
    limit: limit_card,
  });

  const handlePage = (current_page: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("current_page", current_page.toString());
    setSearchParams(newParams);
  };

  return (
    <div className={styles["card-grid"]}>
      <div className={styles["card-grid__list"]}>
        {status === "loading" && <p>load...</p>}
        {error && <p>ошибка загрузки...</p>}
        {isSuccess &&
          data.posts.map((post, index) => (
            <div key={index} className={styles["card-grid__item"]}>
              <CardArticle {...post} />
            </div>
          ))}
      </div>

      <div className={styles["card-grid__pagination"]}>
        {isSuccess &&
          data.pagination.total_pages &&
          Array.from({ length: data.pagination.total_pages }, (_, i) => (
            <button
              key={i}
              className={clsx(
                styles["card-grid__page"],
                data.pagination.current_page === i + 1 &&
                  styles["card-grid__page--active"]
              )}
              onClick={() => handlePage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
      </div>
    </div>
  );
};
