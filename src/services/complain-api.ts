// Import necessary modules and functions
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./base"; // Assuming 'base' is your custom base query

type ComplainPOSTRequest = {
  name: string;
  email: string;
  phone: string;
  description: string;
};
// Create a Redux Toolkit Query API using createApi
export const complainApi = createApi({
  reducerPath: "complainApi", // Name of the reducer path for this API slice
  baseQuery: baseQuery, // Custom base query for making HTTP requests
  endpoints: (builder) => ({
    createComplain: builder.mutation({
      query: ({ body }: { body: ComplainPOSTRequest }) => ({
        url: "/complains",
        method: "POST",
        body,
      }),
    }),
  }),
});

// Export the generated query hooks for the defined endpoints
export const { useCreateComplainMutation } = complainApi;
