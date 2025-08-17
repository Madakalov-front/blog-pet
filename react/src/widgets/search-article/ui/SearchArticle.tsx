import { Input } from "@/shared";
import { useValidSearch } from "@/widgets/search-article/model/useValidSearch";
import { debounce } from "lodash";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";

import styles from "./SearchArticle.module.scss";
import { createSlug } from "@/shared/utils/create-slug";
import { useLazySearchPostsQuery, type PostProps } from "@/app/reducers";

export const SearchArticle = () => {
  const {
    register,
    setValue,
    setError,
    trigger,
    formState: { errors },
    watch,
  } = useValidSearch();
  const [posts, setPosts] = useState<PostProps[] | undefined>([]);
  const watchedValue = watch("search_article");
  const [searchPosts] = useLazySearchPostsQuery();

  const debounceChange = useMemo(
    () =>
      debounce(async (value) => {
        if (!value) {
          setPosts([]);
          setError("search_article", { message: "" });
          return;
        }
        const isValidNow = await trigger("search_article");
        if (isValidNow) {
          const data = await searchPosts(createSlug(value)).unwrap();
          setPosts(data);
        } else {
          setPosts([]);
        }
      }, 500),
    [watchedValue]
  );

  useEffect(() => {
    debounceChange(watchedValue);
    return () => {
      debounceChange.cancel();
      setPosts([]);
    };
  }, [watchedValue, debounceChange]);

  return (
    <div className={styles["search-article"]}>
      <div className={styles.container}>
        <div className={styles["form-search"]}>
          <form>
            <Input
              type="search"
              className={styles["form-search__search"]}
              placeholder="Начните поиск..."
              {...register("search_article")}
            />
            <div className={styles["form-search__action"]}>
              {watchedValue?.length > 0 && (
                <button
                  type="button"
                  className={styles["form-search__button-clear"]}
                  onClick={() => setValue("search_article", "")}
                >
                  очистить
                </button>
              )}
            </div>
          </form>
          {errors && <p>{errors.search_article?.message}</p>}
        </div>
        {posts && posts.length > 0 && (
          <ul className={styles["search-list"]}>
            {posts.map(({ id, slug, title }) => (
              <li key={id}>
                <Link to={`/article/${slug}/${id}`}>{title}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
