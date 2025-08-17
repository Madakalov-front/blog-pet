import { CommentsForm, CommetsList } from "@/feature/comments/ui/internal";
import styles from "./Comments.module.scss";

export const Comments = () => {
  return (
    <div className={styles.commets}>
      <CommentsForm />
      <CommetsList />
    </div>
  );
};
