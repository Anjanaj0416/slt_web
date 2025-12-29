// Import necessary modules and functions
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./base"; // Assuming 'base' is your custom base query

// Create a Redux Toolkit Query API using createApi
export const paymentSettingApi = createApi({
  reducerPath: "paymentSettingApi", // Name of the reducer path for this API slice
  baseQuery: baseQuery, // Custom base query for making HTTP requests
  tagTypes: ["PAYMENT_SETTING"],
  endpoints: (builder) => ({
    getPaymentSettings: builder.query({
      query: ({ page, size = 20 }) => {
        const params = new URLSearchParams({
          page: String(page),
          size: String(size),
          sort: "createdAt",
        });
        return `/payment-settings?${params.toString()}`;
      },
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: "PAYMENT_SETTING", id })),
              "PAYMENT_SETTING",
            ]
          : ["PAYMENT_SETTING"],
    }),
  }),
});

// Export the generated query hooks for the defined endpoints
export const { useGetPaymentSettingsQuery, useLazyGetPaymentSettingsQuery } =
  paymentSettingApi;
