import { useAppSelector } from "@/app/store";
import { setFirstSymUpperCase } from "@/shared/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { ROLE_ID } from "@/shared/constants";
import {
  useDeleteCommentMutation,
  useGetCommentsQuery,
} from "@/app/reducers/comment-api";
import { useParams } from "react-router";
import { LoaderSpinner } from "@/shared/ui/loader-spinner/LoaderSpinner";
import styles from "./CommentsList.module.scss";

export const CommetsList = () => {
  const { id } = useParams();
  const {
    data: comments,
    isError,
    isSuccess,
    isFetching,
    isLoading,
  } = useGetCommentsQuery(Number(id));
  const role_id = useAppSelector((store) => store.user.role_id);
  const [deleteComment] = useDeleteCommentMutation();
  const handleRemoveComment = async (id: number) => {
    try {
      await deleteComment(id).unwrap();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className={styles["comments-list"]}>
        {(isLoading || isFetching) && <LoaderSpinner />}
        {isSuccess &&
          (comments.length ? (
            comments.map((comment) => (
              <div className={styles["comments-list__item"]} key={comment.id}>
                <div>
                  <time dateTime={comment.published_at}>
                    {comment.published_at}
                  </time>
                  <h3>{setFirstSymUpperCase(comment.name)}</h3>
                  <p>{comment.comment}</p>
                </div>
                {role_id !== null && role_id <= ROLE_ID.MODERATOR && (
                  <button
                    onClick={() =>
                      handleRemoveComment(comment.id ? comment.id : -1)
                    }
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>
                )}
              </div>
            ))
          ) : (
            <h3>Комментариев пока нет</h3>
          ))}
        {isError && <p>Ошибка загрузки, обновите позднее...</p>}
      </div>
    </>
  );
};
