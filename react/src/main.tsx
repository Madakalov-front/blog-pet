import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "@/app/layout";
import { ArticlesPage } from "@/pages/articles";
import { ArticlePage } from "@/pages/article";
import { NotFoundPage } from "@/pages/not-found";
import { LoginPage } from "@/pages/login/indes";
import { RegisterPage } from "./pages/register/ui/RegisterPage";
import { UsersPage } from "@/pages/users";
import { NewArticle } from "@/pages/new-article";
import { Provider } from "react-redux";
import { store } from "@/app/store";

import "./shared/icons/fontAwesome";
import "./assets/style/index.scss";
import { MainPage } from "@/pages/main";

createRoot(document.body!).render(
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path={"/register"} element={<RegisterPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/new-article" element={<NewArticle />} />
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/article/:slug/:id" element={<ArticlePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
);
