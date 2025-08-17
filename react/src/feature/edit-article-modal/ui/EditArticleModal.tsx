import { PostForm } from "@/entities";
import { useValidPost } from "@/shared/hooks";
import type { FormDataPost } from "@/shared/schema";
import { createSlug } from "@/shared/utils/create-slug";
import { type Dispatch, type SetStateAction } from "react";

import styles from "./EditArticleModal.module.scss";
import { useEditPostMutation, type PostProps } from "@/app/reducers/post-api";
type EditArticleModalProps = {
  post: PostProps;
  showEditFlag: Dispatch<SetStateAction<boolean>>;
};

export const EditArticleModal = ({
  post,
  showEditFlag,
}: EditArticleModalProps) => {
  const { register, handleSubmit } = useValidPost({
    defaultValues: {
      title: post.title,
      content: post.content,
      image_url: post.image_url || "",
    },
  });
  const [editPost] = useEditPostMutation();

  const onSubmit = async (data: FormDataPost) => {
    if (!post) return;

    const updatedFields = {
      title: data.title,
      content: data.content,
      image_url: data.image_url,
      slug: data.title !== post.title ? createSlug(data.title) : post.slug,
    };

    const newPost: PostProps = {
      ...post,
      ...updatedFields,
    };

    try {
      await editPost(newPost).unwrap();
    } catch (error) {
      console.error(error);
    }

    showEditFlag(false);
  };

  return (
    <div className={styles["edit-article-modal"]}>
      <div className={styles["edit-article-modal__overlay"]}></div>
      <PostForm
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        name_button="сохранить"
      />
    </div>
  );
};
