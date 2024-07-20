// Import necessary modules and functions
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./base"; // Assuming 'base' is your custom base query
// Create a Redux Toolkit Query API using createApi
export const productApi = createApi({
  reducerPath: "productApi", // Name of the reducer path for this API slice
  baseQuery: baseQuery, // Custom base query for making HTTP requests
  tagTypes: ["PRODUCT"],
  endpoints: (builder) => ({
    filteredProducts: builder.query({
      query: ({ categoryId, page = 0, size = 10 }) =>
        `/products?&page=${page}&size=${size}&categoryId=${categoryId}`,
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: "PRODUCT", id })),
              "PRODUCT",
            ]
          : ["PRODUCT"],
    }),
    listProducts: builder.query({
      query: ({ page = 0, size = 10 }) => `/products?page=${page}&size=${size}`,
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: "PRODUCT", id })),
              "PRODUCT",
            ]
          : ["PRODUCT"],
    }),
    searchListProducts: builder.query({
      query: ({ filters, page = 0, size = 9 }) =>
        `/products?&page=${page}&size=${size}&${filters}`,
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: "PRODUCT", id })),
              "PRODUCT",
            ]
          : ["PRODUCT"],
    }),
    getProduct: builder.query({
      query: ({ userId, storeId, productId }) =>
        `/users/${userId}/stores/${storeId}/products/${productId}`,
      providesTags: ["PRODUCT"],
    }),
    getProductsByStoreId: builder.query({
      query: ({
        storeId,
        categoryId,
        brand,
        minPrice = 0,
        maxPrice = 0,
        page = 0,
        size = 9,
      }) => {
        let path = `stores/${storeId}/products`;
        const filters = [];
        if (categoryId) {
          filters.push(`categoryId=${categoryId}`);
        }
        if (brand) {
          filters.push(`brand=${brand}`);
        }
        if (minPrice) {
          filters.push(`minPrice=${minPrice}`);
        }
        if (maxPrice) {
          filters.push(`maxPrice=${maxPrice}`);
        }
        return filters.length > 0
          ? `${path}?${filters.join("&")}&size=${size}&page=${page}`
          : `${path}?size=${size}&page=${page}`;
      },
      providesTags: ["PRODUCT"],
    }),
    getProductById: builder.query({
      query: ({ productId }) => `/products?productId=${productId}`,
      providesTags: ["PRODUCT"],
    }),
  }),
});

// Export the generated query hooks for the defined endpoints
export const {
  useLazySearchListProductsQuery,
  useSearchListProductsQuery,
  useFilteredProductsQuery,
  useLazyFilteredProductsQuery,
  useListProductsQuery,
  useLazyListProductsQuery,
  useLazyGetProductQuery,
  useGetProductByIdQuery,
  useLazyGetProductByIdQuery,
  useGetProductQuery,
  useGetProductsByStoreIdQuery,
  useLazyGetProductsByStoreIdQuery,
} = productApi;
