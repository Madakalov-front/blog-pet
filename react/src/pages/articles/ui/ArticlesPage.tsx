import { CardArticle } from "@/entities";
import styles from "./ArticlesPage.module.scss";
import { useGetPostsQuery, type PostProps } from "@/app/reducers";

export const ArticlesPage = () => {
  const { data, isLoading, isError, isFetching, isSuccess } = useGetPostsQuery(
    {}
  );

  return (
    <main className={styles["articles-page"]}>
      <div className="container">
        <h1>Статьи</h1>
        {isLoading || (isFetching && <p>загрузка...</p>)}
        {isError && <p>ошибка...</p>}
        {isSuccess && (
          <div className={styles["articles-page__inner"]}>
            {data.posts &&
              data.posts.map((article: PostProps) => (
                <CardArticle key={article.id} {...article} />
              ))}
          </div>
        )}
      </div>
    </main>
  );
};
