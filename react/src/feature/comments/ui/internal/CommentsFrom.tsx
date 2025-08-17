import { useAppSelector } from "@/app/store";
import {
  useFormComments,
  type FormDataComments,
} from "@/feature/comments/model/useFormComments";
import { Button } from "@/shared";
import { MAX_LENGTH, ROLE_ID } from "@/shared/constants";
import { useParams } from "react-router";
import { Link } from "react-router";
import styles from "./CommentForm.module.scss";
import { useCreateCommentMutation, type CommentsProps } from "@/app/reducers";

export const CommentsForm = () => {
  const { id: idPage } = useParams();
  const { role_id, login } = useAppSelector((store) => store.user);
  const notGuest = role_id !== ROLE_ID.GUEST;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setValue,
  } = useFormComments();
  const [createComment] = useCreateCommentMutation();

  const onSubmit = async (data: FormDataComments) => {
    const newComment: CommentsProps = {
      name: login,
      comment: data.comment,
      fk_post_id: Number(idPage),
    };
    setValue("comment", "");
    // await setCommetForPost(newComment);
    try {
      await createComment(newComment).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles["comments-text-area"]}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea
          id="comment"
          {...register("comment")}
          maxLength={MAX_LENGTH}
          data-error-message={errors.comment?.message}
          disabled={!notGuest}
        ></textarea>
        <Button
          type="submit"
          disabled={!notGuest || isSubmitting}
          name={isSubmitting ? "отправка..." : "отправить"}
        />
      </form>

      {notGuest ? (
        <div className={styles["comments-text-area__info"]}>
          <span>
            {watch("comment")?.length ?? 0} / {MAX_LENGTH}
          </span>
          {errors.comment?.message && (
            <span className={styles["comments-text-area__error"]}>
              {errors.comment.message}
            </span>
          )}
        </div>
      ) : (
        <p className={styles["comments-text-area__login-hint"]}>
          <Link to="/login">Войдите</Link>, чтобы оставить комментарий
          {errors.comment?.message}
        </p>
      )}
    </div>
  );
};
