import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: "api",
    tagTypes: ["Post", "Comment", "User"],
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://blog-pet.onrender.com',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set("Authorization", `Bearer ${JSON.parse(token)}`);
            }
            headers.set('Access-Control-Allow-Origin', 'https://blog-pet-seven.vercel.app');
      headers.set('Access-Control-Allow-Credentials', 'true');
            return headers;
        },
    }),

    endpoints: () => ({}),
});
