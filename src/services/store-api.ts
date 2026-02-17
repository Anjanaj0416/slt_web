// Import necessary modules and functions
import { createApi } from "@reduxjs/toolkit/query/react";
import { publicBaseQuery } from "./base"; // Assuming 'base' is your custom base query

// Create a Redux Toolkit Query API using createApi
export const storeApi = createApi({
  reducerPath: "storeApi", // Name of the reducer path for this API slice
  baseQuery: publicBaseQuery, // Custom base query for making HTTP requests
  tagTypes: ["STORE"],
  endpoints: (builder) => ({
    listStore: builder.query({
      query: ({ page = 0, size = 2, productId }) => {
        let url = `/stores?page=${page}&size=${size}&sort=name`;
        if (productId) {
          url += `&productId=${productId}`;
        }
        return url;
      },
      providesTags: (result, error, arg) =>
        result
          ? [...result.data.map(({ id }) => ({ type: "STORE", id })), "STORE"]
          : ["STORE"],
    }),
  }),
});

// Export the generated query hooks for the defined endpoints
export const { useLazyListStoreQuery, useListStoreQuery } = storeApi;
