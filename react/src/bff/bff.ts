import { addUser } from "@/bff/add-user";
import { getUser } from "@/bff/get-user";
import { sessions } from "@/bff/session";
import type { autorizeType, registerType } from "@/bff/types";
import { ROLE_ID } from "@/shared/constants";
import type { UserType } from "@/shared/types";

export const server = {
  async autorize({ authLogin, authPassword }: autorizeType) {
    const user = await getUser(authLogin);
    const userData: UserType = user[0];
    if (!userData) {
      return {
        error: "Такой пользователь не найден",
        res: {
          id: null,
          role_id: null,
          login: null,
          session: null,
          wasLogout: false,
          registed_at: null,
        },
        errorType: "login",
      };
    }

    if (user[0].password !== authPassword) {
      return {
        error: "Неверный пароль",
        res: {
          id: null,
          role_id: null,
          login: null,
          session: null,
          wasLogout: false,
          registed_at: null,
        },
        errorType: "password",
      };
    }

    const session = sessions.createSession(userData);

    return {
      error: null,
      res: {
        id: userData.id,
        role_id: userData.role_id,
        login: userData.login,
        session,
        wasLogout: true,
        registed_at: userData.registed_at,
      },
    };
  },

  async register({ regLogin, regPassword }: registerType) {
    const user = await getUser(regLogin);
    if (user[0]?.login === regLogin) {
      return {
        error: "Такой логин занят",
        res: {
          id: null,
          role_id: null,
          login: null,
          session: null,
          wasLogout: false,
          registed_at: null,
        },
      };
    }

    await addUser({ regLogin, regPassword });

    return {
      error: null,
      res: {
        id: user.id,
        role_id: ROLE_ID.READER,
        login: user.login,
        sessions: null,
        wasLogout: false,
      },
    };
  },
  async logout(session: string) {
    sessions.remove(session);
  },
};
