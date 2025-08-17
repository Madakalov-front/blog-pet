export type autorizeType = {
  authLogin: string;
  authPassword: string;
};

export type registerType = {
  regLogin: string;
  regPassword: string;
};

export interface sessionInterface {
  logOut: () => void;
  removeComment?: () => void;
}
