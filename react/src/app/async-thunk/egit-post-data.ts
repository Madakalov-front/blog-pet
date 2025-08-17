import type { PostProps } from "@/app/reducers";

export const editPostData = async (post: PostProps) => {
  try {
    const res = await fetch(`/api/posts/${post.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });
    if (!res.ok) throw new Error(`status error - ${res.status}`);
    return res.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
    }
  }
};
