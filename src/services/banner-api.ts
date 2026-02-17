// Import necessary modules and functions
import { createApi } from "@reduxjs/toolkit/query/react";
import { publicBaseQuery } from "./base"; // Assuming 'base' is your custom base query

// Create a Redux Toolkit Query API using createApi
export const bannerApi = createApi({
  reducerPath: "bannerApi", // Name of the reducer path for this API slice
  baseQuery: publicBaseQuery, // Custom base query for making HTTP requests
  endpoints: (builder) => ({
    getAllBanners: builder.query({
      query: ({ type, page = 0, limit = 100 }) =>
        `/banners?bannerType=${type}&page=${page}&size=${limit}`,
    }),
  }),
});

// Export the generated query hooks for the defined endpoints
export const { useGetAllBannersQuery, useLazyGetAllBannersQuery } = bannerApi;
