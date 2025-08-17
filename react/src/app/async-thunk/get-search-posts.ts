import type { PostProps } from "../reducers";


export const getSearchPost = async (title: string) => {
  try {
    const res = await fetch("/api/posts");
    if (!res.ok) throw new Error(`status filter fetch: ${res.ok}`);
    const data: PostProps[] = await res.json();
    return data.filter((item) =>
      item.title.toLowerCase().includes(title.toLowerCase())
    );
  } catch (error) {
    console.log(error);
  }
};
