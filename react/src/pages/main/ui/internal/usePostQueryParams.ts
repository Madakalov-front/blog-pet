import { LIMIT_ARTICLE } from "@/shared/constants";
import { useEffect } from "react";
import { useSearchParams } from "react-router";

export const usePostQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const current_page = searchParams.get("current_page") ?? "1";
  const limit_card = searchParams.get("limit") ?? LIMIT_ARTICLE.toString();

  useEffect(() => {
    const hasCurrentPage = searchParams.has("current_page");
    const hasLimit = searchParams.has("limit");

    if (!hasCurrentPage || !hasLimit) {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        if (!hasCurrentPage) newParams.set("current_page", "1");
        if (!hasLimit) newParams.set("limit", LIMIT_ARTICLE.toString());
        return newParams;
      });
    }
  }, []);

  return {
    current_page: parseInt(current_page),
    limit_card: parseInt(limit_card),
    setSearchParams,
    searchParams,
  };
};
