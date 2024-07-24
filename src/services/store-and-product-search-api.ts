// Import necessary modules and functions
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./base"; // Assuming 'base' is your custom base query
// Create a Redux Toolkit Query API using createApi
export const storeAndProductSearchApi = createApi({
  reducerPath: "storeAndProductSearchApi", // Name of the reducer path for this API slice
  baseQuery: baseQuery, // Custom base query for making HTTP requests
  tagTypes: ["STORE_AND_PRODUCT_SEARCH"],
  endpoints: (builder) => ({
    getStoreAndProductSearch: builder.query({
      query: ({ search }) => `/store-product-search?search=${search}`,
      providesTags: ["STORE_AND_PRODUCT_SEARCH"],
    }),
  }),
});

// Export the generated query hooks for the defined endpoints
export const {
  useGetStoreAndProductSearchQuery,
  useLazyGetStoreAndProductSearchQuery,
} = storeAndProductSearchApi;
