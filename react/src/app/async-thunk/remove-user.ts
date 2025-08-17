export const fetchRemoveUser = async (id: number) => {
  try {
    await fetch(`/api/users/${id}`, { method: "DELETE" });
  } catch (error) {
    if (error instanceof Error) console.error(error);
  }
};
