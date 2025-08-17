import type { sessionInterface } from "@/bff/types";

export const addSession = () => {
  const session: sessionInterface = {
    logOut(): void {
      (Object.keys(session) as (keyof typeof session)[]).forEach(
        (key) => delete session[key]
      );
    },
  };

  // switch (role_id) {
  //   case ROLE_ID.ADMIN: {
  //     session.removeComment = removeComment;
  //     break;
  //   }
  //   case ROLE_ID.MODERATOR: {
  //     session.removeComment = removeComment;
  //     break;
  //   }
  //   case ROLE_ID.READER: {
  //     break;
  //   }
  //   default: {
  //     break;
  //   }
  // }

  return {
    removeComment(): void {
      console.log("remove comment");
    },
  };
};
