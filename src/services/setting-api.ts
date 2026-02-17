// Import necessary modules and functions
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./base"; // Assuming 'base' is your custom base query

// Create a Redux Toolkit Query API using createApi
export const settingApi = createApi({
  reducerPath: "settingApi", // Name of the reducer path for this API slice
  baseQuery: baseQuery, // Custom base query for making HTTP requests
  tagTypes: ["SETTING"],
  endpoints: (builder) => ({
    getSettings: builder.query({
      query: () => "/site-settings",
      providesTags: ["SETTING"],
    }),
  }),
});

// Export the generated query hooks for the defined endpoints
export const { useGetSettingsQuery, useLazyGetSettingsQuery } = settingApi;
