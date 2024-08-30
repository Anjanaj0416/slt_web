import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./base";
import { POSTReviewRequest } from "models/Review.model";
//
export const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery,
  tagTypes: ["REVIEWS", "REVIEW"],
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: ({ productId, page = 0, limit = 8 }) =>
        `/reviews?productId=${productId}&sort=createdAt,desc&page=${page}&limit=${limit}`,
      providesTags: ["REVIEWS"],
    }),
    postReview: builder.mutation({
      query: ({
        userId,
        body,
      }: {
        userId: string;
        body: POSTReviewRequest;
      }) => ({
        url: `/users/${userId}/reviews`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["REVIEW", "REVIEWS"],
    }),
  }),
});
//
export const {
  useGetReviewsQuery,
  useLazyGetReviewsQuery,
  usePostReviewMutation,
} = reviewApi;
