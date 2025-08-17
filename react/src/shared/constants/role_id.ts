import type { ROLE_ID_TYPE } from "@/shared/types";

export const ROLE_ID: ROLE_ID_TYPE = {
  ADMIN: 0,
  MODERATOR: 1,
  READER: 2,
  GUEST: 3,
};

export const ROLE_NAME: { [key: number]: string } = {
  0: "Администратор",
  1: "Модератор",
  2: "Читатель",
};
