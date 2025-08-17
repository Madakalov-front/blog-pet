export const setUserRole = async (id: number, role_id: number) => {
  try {
    await fetch(`/api/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role_id: role_id }),
    });
  } catch (error) {
    if (error instanceof Error) console.error(error);
  }
};
