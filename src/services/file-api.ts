// Import necessary modules and functions
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./base"; // Assuming 'base' is your custom base query

// Create a Redux Toolkit Query API using createApi
export const fileApi = createApi({
  reducerPath: "fileApi", // Name of the reducer path for this API slice
  baseQuery: baseQuery, // Custom base query for making HTTP requests
  endpoints: (builder) => ({
    createSignUrl: builder.query({
      query: ({ type, extension, storeId, productId, categoryId, userId }) => {
        let url = `/file/upload?type=${type}&extension=${extension}&storeId=${storeId}`;
        if (productId) {
          url = `${url}&productId=${productId}`;
        }
        if (categoryId) {
          url = `/file/upload?type=${type}&extension=${extension}&categoryId=${categoryId}`;
        }
        if (userId) {
          url = `/file/upload?type=${type}&extension=${extension}&userId=${userId}`;
        }
        //
        return url;
      }, //TODO: validate query
    }),
  }),
});
// Export the generated query hooks for the defined endpoints
export const { useLazyCreateSignUrlQuery } = fileApi;
