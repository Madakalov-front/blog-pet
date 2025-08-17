export const getUser = async (loginToFind: string) => {
  const resolve = await fetch(`/api/users?login=${loginToFind}`);
  if (!resolve.ok) throw new Error(`${resolve.status} - статус ошибки`);
  const user = await resolve.json();
  return { ...user };
};
