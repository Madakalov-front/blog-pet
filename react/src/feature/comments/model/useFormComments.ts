import { MAX_LENGTH, MIN_LENGTH } from "@/shared/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  comment: z
    .string()
    .nonempty({ message: "Комментарий не может быть пустым" })
    .min(MIN_LENGTH, "Введите пожалуйста не менее 15 символов")
    .max(MAX_LENGTH, "Максимальное кол-во допустимых символов")
    .regex(
      /^[\p{L}\p{N}\p{P}\p{Zs}]+$/u,
      "Только буквы, цифры и знаки препинания"
    ),
});
export type FormDataComments = z.infer<typeof schema>;

export const useFormComments = () => {
  return useForm<FormDataComments>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });
};
