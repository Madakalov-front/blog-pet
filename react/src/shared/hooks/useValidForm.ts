import { schemaPost, type FormDataPost } from "@/shared/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const useValidPost = (options?: { defaultValues?: FormDataPost }) => {
  return useForm<FormDataPost>({
    resolver: zodResolver(schemaPost),
    mode: "onBlur",
    defaultValues: options?.defaultValues,
  });
};
