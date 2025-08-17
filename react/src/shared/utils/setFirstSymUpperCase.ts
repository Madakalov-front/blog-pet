export const setFirstSymUpperCase = (string: string | null) => {
  return string && string.slice(0, 1).toLocaleUpperCase() + string.slice(1);
};
