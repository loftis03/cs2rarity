import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const CS2Rarity = createApi({
    reducerPath: " cs2Api ",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_HOST,
    }),
    endpoints: (builder) => ({
        getAccount: builder.query({
            query: () => ({
                url: "/token",
                credentials: "include",
            }),
            transformResponse: (response) => (response ? response.account : null),
            providesTags: ["Account"],
        }),

        login: builder.mutation({
            query: ({ username, password }) => {
                const body = new FormData();
                body.append("username", username);
                body.append("password", password);
                return {
                    url: "/token",
                    method: "POST",
                    body,
                    credentials: "include",
                };
            },
            invalidatesTags: ["Account"],
        }),

        logout: builder.mutation({
            query: () => ({
              url: "/token",
              method: "DELETE",
              credentials: "include",
            }),
            invalidatesTags: ["Account"],
          }),
      
          signup: builder.mutation({
            query: (body) => ({
              url: "api/accounts",
              method: "POST",
              body,
              credentials: "include",
            }),
            invalidatesTags: ["Account"],
          }),
      
    })
});

export const {
    useGetAccountQuery,
    useLoginMutation,
    useLogoutMutation,
    useSignupMutation,
} = CS2Rarity;
