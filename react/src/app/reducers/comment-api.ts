import { baseApi } from "@/shared/api";

export type CommentsProps = {
  readonly id?: number;
  name: string | null;
  comment: string;
  published_at?: string;
  fk_post_id: number;
};
export const commentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getComments: build.query<CommentsProps[], number>({
      query: (fk_post_id: number) => ({
        url: `/posts/${fk_post_id}/comments`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Comment" as const, id })),
              { type: "Comment", id: "LIST" },
            ]
          : [{ type: "Comment", id: "LIST" }],
    }),
    createComment: build.mutation({
      query: ({ name, comment, fk_post_id }: CommentsProps) => ({
        url: "/comment-create",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          name,
          comment,
          fk_post_id,
        },
      }),
      invalidatesTags: [{ type: "Comment", id: "LIST" }],
    }),
    deleteComment: build.mutation({
      query: (id: number) => ({
        url: "/comment-delete",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          id,
        },
      }),
      invalidatesTags: [{ type: "Comment", id: "LIST" }],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useCreateCommentMutation,
  useDeleteCommentMutation,
} = commentApi;
