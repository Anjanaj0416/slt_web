// Import necessary modules and functions
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./base"; // Assuming 'base' is your custom base query
// Create a Redux Toolkit Query API using createApi
export const productApi = createApi({
  reducerPath: "productApi", // Name of the reducer path for this API slice
  baseQuery: baseQuery, // Custom base query for making HTTP requests
  tagTypes: ["PRODUCT", "PRODUCT"],
  endpoints: (builder) => ({
    filteredProducts: builder.query({
      query: ({ categoryIds }) => `/products?&size=10&categoryIds=${categoryIds}`,
      providesTags: (result, error, arg) =>
        result
          ? [...result.data.map(({ id }) => ({ type: "PRODUCT", id })), "PRODUCT"]
          : ["PRODUCT"],
    }),
    listProducts: builder.query({
      query: ({ page }) => `/products?page=${page}&size=10`,
      providesTags: (result, error, arg) =>
        result
          ? [...result.data.map(({ id }) => ({ type: "PRODUCT", id })), "PRODUCT"]
          : ["PRODUCT"],
    }),
    getProduct: builder.query({
      query: ({ userId, storeId, productId }) =>
        `/users/${userId}/stores/${storeId}/products/${productId}`,
      providesTags: ["PRODUCT"],
    }),
  }),
});

// Export the generated query hooks for the defined endpoints
export const {
  useFilteredProductsQuery,
  useLazyFilteredProductsQuery,
  useListProductsQuery,
  useLazyListProductsQuery,
  useLazyGetProductQuery,
  useGetProductQuery,
} = productApi;
