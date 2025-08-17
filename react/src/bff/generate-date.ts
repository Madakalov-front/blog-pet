export const generateDate = () =>
  new Date(Math.random() * 1_000_000_000_000 + 1_999_999_999_999)
    .toISOString()
    .substring(0, 16)
    .replace("T", " ");
