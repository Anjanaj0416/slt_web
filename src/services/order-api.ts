// Import necessary modules and functions
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./base"; // Assuming 'base' is your custom base query
// Create a Redux Toolkit Query API using createApi
export const orderApi = createApi({
  reducerPath: "orderApi", // Name of the reducer path for this API slice
  baseQuery: baseQuery, // Custom base query for making HTTP requests
  tagTypes: ["ORDERS", "ORDER"],
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: ({ userId, page }) =>
        `/users/${userId}/orders?page=${page}&size=5&sort=createdAt,desc`,
      providesTags: ["ORDERS"],
    }),
    createOrder: builder.mutation({
      query: ({ body }) => ({
        url: `/orders`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["ORDER", "ORDERS"],
    }),
  }),
});

// Export the generated query hooks for the defined endpoints
export const { useLazyGetOrdersQuery, useCreateOrderMutation } = orderApi;
