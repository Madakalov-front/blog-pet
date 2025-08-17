import { createSlug } from "@/shared/utils/create-slug";
import type { FormDataPost } from "@/shared/schema";
import { PostForm } from "@/entities";
import { useValidPost } from "@/shared/hooks";
import { useCreatePostMutation, type PostProps } from "@/app/reducers";
import { useNavigate } from "react-router";

export const NewPostForm = () => {
  const { register, handleSubmit, setValue } = useValidPost();
  const [createPost] = useCreatePostMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: FormDataPost) => {
    const newPost: PostProps = {
      title: data.title,
      content: data.content,
      image_url: data.image_url,
      slug: createSlug(data.title),
    };
    try {
      await createPost(newPost).unwrap();
      setValue("title", "");
      setValue("content", "");
      setValue("image_url", "");
      navigate(-1);
    } catch (error) {
      console.error("Ошибка при создании поста:", error);
    }
  };

  return (
    <PostForm
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      name_button="создать"
    />
  );
};
