import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { string, z } from "zod";

const schema = z.object({
  search_article: string().min(2, { message: "слишком короткий запрос" }),
});

export type FormSearctArticle = z.infer<typeof schema>;

export const useValidSearch = () => {
  return useForm<FormSearctArticle>({
    resolver: zodResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
  });
};
