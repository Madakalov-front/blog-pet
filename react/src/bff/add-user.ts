import { generateDate } from "@/bff/generate-date";
import type { registerType } from "@/bff/types";
import { ROLE_ID } from "@/shared/constants";

export const addUser = async ({ regLogin, regPassword }: registerType) => {
  await fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      login: regLogin,
      password: regPassword,
      registed_at: generateDate(),
      role_id: ROLE_ID.READER,
    }),
  });
};
