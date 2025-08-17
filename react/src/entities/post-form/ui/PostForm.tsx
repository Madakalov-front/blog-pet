import type { UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import styles from "./PostForm.module.scss";
import type { FormDataPost } from "@/shared/schema";
import { Button } from "@/shared";

type PostFormProps = {
  register: UseFormRegister<FormDataPost>;
  handleSubmit: UseFormHandleSubmit<FormDataPost>;
  onSubmit: (data: FormDataPost) => void;
  name_button: string;
};

export const PostForm = ({
  register,
  handleSubmit,
  onSubmit,
  name_button,
}: PostFormProps) => {
  return (
    <form className={styles["post-form"]} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles["post-form__group"]}>
        <label htmlFor="title" className={styles["post-form__label"]}>
          Title
        </label>
        <input
          id="title"
          {...register("title")}
          className={styles["post-form__input"]}
        />
      </div>
      <div className={styles["post-form__group"]}>
        <label htmlFor="content" className={styles["post-form__label"]}>
          Content
        </label>
        <textarea
          id="content"
          {...register("content")}
          className={styles["post-form__textarea"]}
        />
      </div>
      <div className={styles["post-form__group"]}>
        <label htmlFor="image_url" className={styles["post-form__label"]}>
          Image URL
        </label>
        <input
          id="image_url"
          {...register("image_url")}
          className={styles["post-form__input"]}
        />
      </div>
      <Button type="submit" name={name_button} variant="submit" />
    </form>
  );
};
