import { MIN_LENGTH } from "@/shared/constants";
import { z } from "zod";

export const schemaPost = z.object({
  title: z
    .string()
    .nonempty("Загловок не может быть пустым")
    .min(MIN_LENGTH, "Не может быть короче 15-ти символов"),
  content: z
    .string()
    .nonempty("Контент не может быть пустым")
    .min(MIN_LENGTH, "Не может быть короче 15-ти символов"),
  image_url: z.string().nonempty(),
});

export type FormDataPost = z.infer<typeof schemaPost>;
