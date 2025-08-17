import type { PostProps } from "../reducers";


export const addPostForDB = async (post: PostProps) => {
  try {
    const res = await fetch(`/api/posts/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
    if (!res.ok) throw new Error(`${res.status} - error status`);
    return res.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
    }
  }
};
