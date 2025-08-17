import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: "api",
    tagTypes: ["Post", "Comment", "User"],
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://blog-pet-seven.vercel.app',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set("Authorization", `Bearer ${JSON.parse(token)}`);
            }
            return headers;
        },
    }),

    endpoints: () => ({}),
});
