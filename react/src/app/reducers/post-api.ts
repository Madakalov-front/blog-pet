import type { CommentsProps } from "@/app/reducers/comment-api";
import { baseApi } from "@/shared/api";

export type PostProps = {
  readonly id?: number;
  title: string;
  slug: string;
  image_url: string;
  content: string;
  published_at?: string;
  comments?: CommentsProps[];
};
export type PostsProps = {
  posts: PostProps[];
  pagination: QueryPaginationProps;
};

export type QueryPaginationProps = {
  current_page?: number;
  limit?: number;
  total_pages?: number;
};

export const postApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPost: build.query<PostProps, string | number>({
      query: (id: string | number) => ({
        url: `/posts/${id}`,
        method: "GET",
      }),
      providesTags: (_, __, id: number | string) => [
        { type: "Post", id },
      ],
    }),
    getPosts: build.query<PostsProps, Partial<QueryPaginationProps>>({
      query: ({ current_page, limit } = {}) => {
        const params: Record<string, string | number> = {};

        if (current_page !== undefined) params.current_page = current_page;
        if (limit !== undefined) params.limit = limit;

        return {
          url: "/posts",
          method: "GET",
          params: {
            current_page,
            limit,
          },
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.posts.map(({ id }) => ({ type: "Post" as const, id })),
              { type: "Post", id: "LIST" },
            ]
          : [{ type: "Post", id: "LIST" }],
    }),
    editPost: build.mutation({
      query: ({ ...body }: PostProps) => ({
        url: `/post-edit/${body.id}`,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      }),
      invalidatesTags: (_, __, post) => [{ type: "Post", id: post.id }],
    }),
    createPost: build.mutation({
      query: ({ title, content, image_url, slug }: PostProps) => ({
        url: "/new-article",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: {
          title,
          content,
          image_url,
          slug,
        },
      }),
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),
    deletePost: build.mutation({
      query: (id: number | string) => ({
        url: `/post-remove/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, id) => [
        { type: "Post", id: id },
        { type: "Post", id: "LIST" },
      ],
    }),
    searchPosts: build.query({
      query: (slug: string) => ({
        url: `/search-post/${slug}`,
        method: "GET",
        params: {
          slug,
        },
      }),
    }),
  }),
});

export const {
  useGetPostQuery,
  useGetPostsQuery,
  useEditPostMutation,
  useCreatePostMutation,
  useDeletePostMutation,
  useLazySearchPostsQuery,
} = postApi;
