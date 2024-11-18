// Import necessary modules and functions
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./base"; // Assuming 'base' is your custom base query

// Create a Redux Toolkit Query API using createApi
export const storeApi = createApi({
  reducerPath: "storeApi", // Name of the reducer path for this API slice
  baseQuery: baseQuery, // Custom base query for making HTTP requests
  tagTypes: ["STORE"],
  endpoints: (builder) => ({
    listStore: builder.query({
      query: ({ page = 0, size = 2 }) =>
        `/stores?page=${page}&size=${size}&sort=name`,
      providesTags: (result, error, arg) =>
        result
          ? [...result.data.map(({ id }) => ({ type: "STORE", id })), "STORE"]
          : ["STORE"],
    }),
  }),
});

// Export the generated query hooks for the defined endpoints
export const { useLazyListStoreQuery, useListStoreQuery } = storeApi;
