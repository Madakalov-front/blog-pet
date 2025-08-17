import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const shemaAuthorization = z.object({
  login: z.string().nonempty({ message: "Обязательное поле*" }),
  password: z.string().nonempty({ message: "Обязательное поле*" }),
});

export type FormDataAuthorization = z.infer<typeof shemaAuthorization>;

export function useAuthorizationForm() {
  return useForm<FormDataAuthorization>({
    resolver: zodResolver(shemaAuthorization),
    mode: "onBlur",
  });
}
