export const removeComment = async (id: number | undefined) => {
  if (!id) return;
  try {
    await fetch(`/api/comments/${id}`, { method: "DELETE" });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
    }
  }
};
