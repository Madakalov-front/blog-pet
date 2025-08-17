import { server } from "@/bff";
import type { FormDataRegister } from "@/feature/registerUser/model/useRegisterForm";
import type { UseFormReset, UseFormSetError } from "react-hook-form";

export const onSubmitCreateUser = async (
  data: FormDataRegister,
  setError: UseFormSetError<FormDataRegister>,
  reset: UseFormReset<FormDataRegister>
) => {
  const result = await server.register({
    regLogin: data.username,
    regPassword: data.password,
  });

  if (result.error) {
    setError("username", { type: "server", message: result.error });
    return;
  }

  reset();
};
