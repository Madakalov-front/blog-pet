import { CardGrid } from "@/pages/main/ui/internal/CardGrid";
import { SearchArticle } from "@/widgets/search-article";
import { Link } from "react-router";

export const MainPage = () => {
  return (
    <main className="main-page">
      <SearchArticle />
      <div className="container">
        <h1>главная</h1>
        <CardGrid />
        <Link to="/articles">{"Все статьи"}</Link>
      </div>
    </main>
  );
};
