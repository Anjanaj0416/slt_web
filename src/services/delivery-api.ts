// Import necessary modules and functions
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./base"; // Assuming 'base' is your custom base query

type ShippingCostPOSTRequestType = {
  body: { productVariantId: string; units: number }[];
};

// Create a Redux Toolkit Query API using createApi
export const deliveryApi = createApi({
  reducerPath: "deliveryApi", // Name of the reducer path for this API slice
  baseQuery: baseQuery, // Custom base query for making HTTP requests
  endpoints: (builder) => ({
    getShippingCost: builder.mutation({
      query: ({ body }: ShippingCostPOSTRequestType) => ({
        url: "delivery/shipping-cost",
        method: "POST",
        body,
      }),
    }),
  }),
});

// Export the generated query hooks for the defined endpoints
export const { useGetShippingCostMutation } = deliveryApi;
