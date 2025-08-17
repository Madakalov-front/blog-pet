import { logOut, setUser } from "@/app/reducers/user-reducer";
import { baseApi } from "@/shared/api";

export type AuthorizProps = {
    login: string;
    password: string;
};
export type RegisterProps = {
    login: string;
    password: string;
};

export type UserProps = {
    user: {
        id: number | null;
        session: string | null;
        role_id: number | null;
        login: string | null;
        wasLogout: boolean;
        registed_at: string | null;
    };
    token: string;
    message?: string;
    error?: string;
};

export type PublicUser = {
    id: number;
    login: string;
    register_at: string;
    role_id: number;
};

export const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        authUser: build.mutation<UserProps, AuthorizProps>({
            query: ({ login, password }) => ({
                url: `/auth`,
                method: "POST",
                body: { login, password },
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUser(data.user));
                    localStorage.setItem("token", JSON.stringify(data.token));
                } catch (error) {
                    console.error("Auth error", error);
                }
            },
        }),
        checkAuth: build.query<UserProps, void>({
            query: () => ({
                url: "/auth/check",
                method: "GET",
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUser(data.user));
                } catch (err) {
                    localStorage.removeItem("token");
                    console.warn("CheckAuth error", err);
                    dispatch(logOut());
                }
            },
        }),
        registerUser: build.mutation({
            query: ({ login, password }: RegisterProps) => ({
                url: "/register",
                method: "POST",
                body: {
                    login,
                    password,
                },
            }),
            invalidatesTags: [{ type: "User", id: "LIST" }],
        }),
        getUsers: build.query<PublicUser[], void>({
            query: () => ({
                url: "/users",
                method: "GET",
            }),
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({
                              type: "User" as const,
                              id: id ?? -1,
                          })),
                          { type: "User", id: "LIST" },
                      ]
                    : [{ type: "User", id: "LIST" }],
        }),
        editRoleUser: build.mutation({
            query: ({ id, role_id }: { id: number; role_id: number }) => ({
                url: `/users/${id}/edit-role`,
                method: "PATCH",
                body: {
                    id,
                    role_id,
                },
            }),
            invalidatesTags: (id) => [
                { type: "User", id },
                { type: "User", id: "LIST" },
            ],
        }),
        deleteUser: build.mutation({
            query: (id: number) => ({
                url: `/users/${id}`,
                method: "DELETE",
                body: { id },
            }),
            invalidatesTags: [{ type: "User", id: "LIST" }],
        }),
    }),
});

export const {
    useAuthUserMutation,
    useCheckAuthQuery,
    useRegisterUserMutation,
    useGetUsersQuery,
    useEditRoleUserMutation,
    useDeleteUserMutation,
} = userApi;
