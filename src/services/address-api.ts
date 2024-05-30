import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./base";
//
export const addressApi = createApi({
  reducerPath: "addressApi",
  baseQuery,
  tagTypes: ["ADDRESSES", "ADDRESS"],
  endpoints: (builder) => ({
    getAddresses: builder.query({
      query: ({ userId }) => `/users/${userId}/addresses`,
      providesTags: ["ADDRESSES"],
    }),
    getAddress: builder.query({
      query: ({ userId, addressId }) =>
        `/users/${userId}/addresses/${addressId}`,
      providesTags: ["ADDRESS"],
    }),
    postAddress: builder.mutation({
      query: ({ userId, body }) => ({
        url: `/users/${userId}/addresses`,
        method: "POST",
        body,
      }),
      //invalidatesTags: ["ADDRESS", "ADDRESSES"],
    }),
    deleteAddress: builder.mutation({
      query: ({ userId, addressId }) => ({
        url: `/users/${userId}/addresses/${addressId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ADDRESSES", "ADDRESS"],
    }),
    updateAddress: builder.mutation({
      query: ({ userId, addressId, body }) => ({
        url: `/users/${userId}/addresses/${addressId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["ADDRESS", "ADDRESSES"],
    }),
  }),
});
//
export const {
  useGetAddressQuery,
  useLazyGetAddressQuery,
  useGetAddressesQuery,
  useLazyGetAddressesQuery,
  usePostAddressMutation,
  useDeleteAddressMutation,
  useUpdateAddressMutation,
} = addressApi;
