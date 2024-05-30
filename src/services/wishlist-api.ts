import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./base";
//
export const wishlistApi = createApi({
  reducerPath: "wishlistApi",
  baseQuery: baseQuery,
  tagTypes: ["WISHLIST"],
  endpoints: (builder) => ({
    getWishlists: builder.query({
      query: ({ userId }) => `/users/${userId}/wishlists`,
      providesTags: ["WISHLIST"],
    }),
    getWishlist: builder.query({
      query: ({ userId, wishlistId }) =>
        `/users/${userId}/wishlists/${wishlistId}`,
      providesTags: ["WISHLIST"],
    }),
    updateWishlist: builder.mutation({
      query: ({ userId, wishlistId, body }) => ({
        url: `/users/${userId}/wishlists/${wishlistId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["WISHLIST"],
    }),
  }),
});
//
export const {
  useGetWishlistQuery,
  useLazyGetWishlistQuery,
  useUpdateWishlistMutation,
  useLazyGetWishlistsQuery,
  useGetWishlistsQuery,
} = wishlistApi;
