import { ROLE_ID, ROLE_NAME } from "@/shared/constants";

export const getRoleName = (role: string) => {
  switch (role) {
    case ROLE_NAME[0]: {
      return ROLE_ID.ADMIN;
    }
    case ROLE_NAME[1]: {
      return ROLE_ID.MODERATOR;
    }
    case ROLE_NAME[2]: {
      return ROLE_ID.READER;
    }
    default: {
      return null;
    }
  }
};
