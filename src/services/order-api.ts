import { createApi } from "@reduxjs/toolkit/query";
import { baseQuery } from "./base";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: baseQuery,
  tagTypes: ["ORDERS", "ORDER"],
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: ({ userId }) => `/users/${userId}/orders`,
      providesTags: ["ORDERS"],
    }),
    postOrder: builder.mutation({
      query: ({ body }) => ({
        url: `/orders`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["ORDER"],
    }),
  }),
});
