import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./base";
//
export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: baseQuery,
  tagTypes: ["CART"],
  endpoints: (builder) => ({
    getCarts: builder.query({
      query: ({ userId }) => `/users/${userId}/carts`,
      providesTags: ["CART"],
    }),
    getCart: builder.query({
      query: ({ userId, cartId }) => `/users/${userId}/carts/${cartId}`,
      providesTags: ["CART"],
    }),
    updateCart: builder.mutation({
      query: ({ userId, cartId, body }) => ({
        url: `/users/${userId}/carts/${cartId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["CART"],
    }),
  }),
});
//
export const {
  useGetCartQuery,
  useLazyGetCartQuery,
  useUpdateCartMutation,
  useLazyGetCartsQuery,
  useGetCartsQuery,
} = cartApi;
