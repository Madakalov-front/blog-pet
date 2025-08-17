export const removePostData = async (id: number | undefined) => {
  if (!id) return;
  try {
    await fetch(`/api/posts/${id}`, { method: "DELETE" });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
    }
  }
};
