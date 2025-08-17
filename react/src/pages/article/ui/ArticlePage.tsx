import { useNavigate, useParams } from "react-router";
import styles from "./ArticlePage.module.scss";
import { Comments } from "@/feature/comments";
import { useAppSelector } from "@/app/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ROLE_ID } from "@/shared/constants";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { EditArticleModal } from "@/feature/edit-article-modal";
import { useState } from "react";
import { useDeletePostMutation, useGetPostQuery } from "@/app/reducers";

export const ArticlePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const role_id = useAppSelector((store) => store.user.role_id);
  const { data: post, isSuccess } = useGetPostQuery(Number(id));
  const [deletePost] = useDeletePostMutation();
  const [showEdit, setShowEdit] = useState<boolean>(false);

  const handleDelete = async () => {
    try {
      await deletePost(Number(id)).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Ошибка при удалении:", error);
    }
  };
  const handleOpenEdit = () => setShowEdit(true);

  const { title, content, image_url, published_at } = post ? post : {};

  return (
    <main className="article-page">
      <div className="container">
        {post ? (
          <div
            className={styles["article-detail"]}
            style={{ backgroundImage: `url(${image_url})` }}
          >
            <div className={styles["article-detail__card"]}>
              <span className={styles["article-detail__date"]}>
                {published_at}
              </span>
              <h1 className={styles["article-detail__title"]}>{title}</h1>
              <p className={styles["article-detail__text"]}>{content}</p>
              {role_id !== null && role_id <= ROLE_ID.MODERATOR && (
                <div className={styles["article-detail-action"]}>
                  <button onClick={handleOpenEdit}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                  <button onClick={handleDelete}>
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <h1>{"Такого поста не существует"}</h1>
        )}

        {isSuccess && showEdit && (
          <EditArticleModal post={post} showEditFlag={setShowEdit} />
        )}
        {post && <Comments />}
      </div>
    </main>
  );
};
