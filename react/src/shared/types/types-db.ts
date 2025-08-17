export interface UserDB {
  readonly id?: number;
  login: FormDataEntryValue | null | string;
  password: FormDataEntryValue | null | string;
  registed_at: FormDataEntryValue | null | string;
  role_id: number;
}
