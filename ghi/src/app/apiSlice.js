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

          getLoggedInProfile: builder.query({
            query: () => ({
                url: '/token',
                credentials: "include",
            }),
            providesTags: ["Profiles"],
          }),


        getSkinList: builder.query({
            query: () => "/api/names",
            transformResponse: (response) => response,
          }),

        getSkinDetails: builder.query({
            query: (skin_id) => ({
                url: `/api/skins/${skin_id}`,
                method:'GET',
                responseType: 'json',
        })
        }),

        getUserInventorySkins: builder.query({
          query: (inventory_id) => ({
            url: `/api/inventory/${inventory_id}/skins`,
            credentials: "include",
        }),
        providesTags: ["inventory"]
        }),

        createUserInventory: builder.mutation({
          query: (data) => ({
            url: "/api/inventory/",
            body: data,
            method: "POST",
            credentials: "include",
          }),
          invalidatesTags: ["inventory"]
        }),

        getUserInventory: builder.query({
            query: () => ({
                url: `/api/inventory`,
                credentials: "include"

        }),
        providesTags: ["inventory"]
          }),

        getFilteredSkinDetails: builder.query({
        query: (skin_list) => ({
            url: `/api/filtered`, // Endpoint URL
            method: 'POST',  // Use POST method
            body: skin_list, // Send skin_list in the request body
            headers: {
                'Content-Type': 'application/json'
            }
        })

        }),
        addToWishlist: builder.mutation({
          query: (wishlist_name, body) => ({
            url: `/api/wishlists/${wishlist_name}/skins`,
            method: "POST",
            body,
            credentials: "include",
          }),
        }),
    
        // removeFromWishlist: builder.mutation({
        //   query: (itemName) => ({
        //     url: `/api/wishlists/${wishlist_id}/skins/${id}`,
        //     method: "DELETE",
        //     body: { itemName },
        //     credentials: "include",
        //   }),
        // }),
    
        // clearWishlist: builder.mutation({
        //   query: () => ({
        //     url: `/api/wishlists/${wishlist_id}`,
        //     method: "DELETE",
        //     credentials: "include",
        //   }),
        // }),
    }),


});

export const {
    useGetAccountQuery,
    useLoginMutation,
    useLogoutMutation,
    useSignupMutation,
    useGetLoggedInProfileQuery,
    useGetSkinListQuery,
    useGetSkinDetailsQuery,
    useGetUserInventorySkinsQuery,
    useCreateUserInventoryMutation,
    useGetUserInventoryQuery,
    useGetFilteredSkinDetailsQuery,
    useAddToWishlistMutation,
    useRemoveFromWishlistMutation,
    useClearWishlistMutation,
} = CS2Rarity;
