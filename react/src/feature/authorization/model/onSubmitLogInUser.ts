import { server } from "@/bff";
import type { FormDataAuthorization } from "@/feature/authorization/model/useAuthorizationForm";
import type { UserType } from "@/shared/types";
import type { UseFormSetError } from "react-hook-form";

export const onSubmitLogInUser = async (
  data: FormDataAuthorization,
  setError: UseFormSetError<FormDataAuthorization>
): Promise<UserType> => {
  const result = await server.autorize({
    authLogin: data.login,
    authPassword: data.password,
  });
  if (result.error) {
    if (result.errorType === "login") {
      setError("login", { type: "server", message: result.error });
      return result.res;
    } else if (result.errorType === "password") {
      setError("password", { type: "server", message: result.error });
      return result.res;
    }
  }
  const userData = result.res;

  return userData;
};
