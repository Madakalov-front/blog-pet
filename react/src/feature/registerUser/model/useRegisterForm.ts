import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schemaRegister = z
  .object({
    username: z
      .string()
      .nonempty({ message: "Имя обязательно" })
      .min(3, { message: "Не менее 3-х символов" })
      .max(20, { message: "Не более 20-ти символов" }),
    password: z
      .string()
      .nonempty({ message: "Пароль обязателен" })
      .min(6, { message: "Пароль должен быть не менее 6 символов" }),
    confirmPassword: z.string().nonempty({ message: "Подтвердите пароль" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export type FormDataRegister = z.infer<typeof schemaRegister>;

export function useRegisterForm() {
  return useForm<FormDataRegister>({
    resolver: zodResolver(schemaRegister),
    mode: "onBlur",
  });
}
