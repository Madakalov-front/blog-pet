import { useAppSelector } from "@/app/store";
import { NewPostForm } from "@/pages/new-article/ui/internal";
import { ROLE_ID } from "@/shared/constants";

export const NewArticle = () => {
  const role_id = useAppSelector((store) => store.user.role_id);

  return (
    <main className="new-article">
      <div className="container">
        {role_id !== null && role_id <= ROLE_ID.MODERATOR ? (
          <NewPostForm />
        ) : (
          <h1>Страница для вас не доступна</h1>
        )}
      </div>
    </main>
  );
};
