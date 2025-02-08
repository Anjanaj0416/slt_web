// Import necessary modules and functions
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./base"; // Assuming 'base' is your custom base query
// Create a Redux Toolkit Query API using createApi
export const voucherApi = createApi({
  reducerPath: "voucherApi", // Name of the reducer path for this API slice
  baseQuery: baseQuery, // Custom base query for making HTTP requests
  tagTypes: ["VOUCHER"],
  endpoints: (builder) => ({
    calculateVoucherDiscount: builder.mutation({
      query: ({  body }) => ({
        url: "vouchers/vouchers/calculate-voucher-discount",
        method: "POST",
        body,
      }),
    }),
  }),
});

// Export the generated query hooks for the defined endpoints
export const {
  useCalculateVoucherDiscountMutation
} = voucherApi;
