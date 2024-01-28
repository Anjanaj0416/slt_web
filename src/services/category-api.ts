// Import necessary modules and functions
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./base"; // Assuming 'base' is your custom base query
// Create a Redux Toolkit Query API using createApi
export const categoryApi = createApi({
  reducerPath: "categoryApi", // Name of the reducer path for this API slice
  baseQuery: baseQuery, // Custom base query for making HTTP requests
  tagTypes: ["CATEGORY", "CATEGORY"],
  endpoints: (builder) => ({
    filteredCategories: builder.query({
      query: ({ size }) => `/categories?&size=${size}&categoryType=PRODUCT&parentCategoryId=null&categoryStatus=APPROVED`,
      providesTags: (result, error, arg) =>
        result
          ? [...result.data.map(({ id }) => ({ type: "CATEGORY", id })), "CATEGORY"]
          : ["CATEGORY"],
    }),
    getCategory: builder.query({
      query: ({ categoryId }) =>
        `/categories/${categoryId}`,
      providesTags: ["CATEGORY"],
    }),
  }),
});

// Export the generated query hooks for the defined endpoints
export const {
  useFilteredCategoriesQuery,
  useLazyFilteredCategoriesQuery,
  useLazyGetCategoryQuery,
  useGetCategoryQuery,
} = categoryApi;
