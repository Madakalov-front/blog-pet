import type { UserType } from "@/shared/types";
type SessionsType = {
  list: { [keys: string]: UserType };
  createSession: (user: UserType) => string;
  remove: (hash: string) => void;
};

export const sessions: SessionsType = {
  list: {},
  createSession(user) {
    const hash: string = Math.random().toFixed(50);
    this.list[hash] = user;
    return hash;
  },
  remove(hash) {
    delete this.list[hash];
  },
};
