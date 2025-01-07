import { Metadata } from "next";
import { WishListPageView } from "pages-sections/customer-dashboard/wish-list";
import request from "utils/request";
import API from "constants/review";
import { notFound } from "next/navigation";
import { auth } from "utils/auth";
import { ReviewsPageView } from "pages-sections/vendor-dashboard/reviews/page-view";
import MyReviewsPageView from "pages-sections/customer-dashboard/my-reviews/my-reviews";

export const metadata: Metadata = {
  title: "Wishlist - TRADEZ ",
  description: `TRADEZ is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [{ name: "UI-LIB", url: "https://ui-lib.com" }],
  viewport: "width=device-width, initial-scale=1",
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};

export default async function WishList({ searchParams }) {
  try {
    const page = searchParams?.page;
    const { user } = await auth();

    const reviews = await request(API.GET_USER_REVIEWS, {
      userId: user?.id,
      query:
        isNaN(page) && page >= 0
          ? "size=6&sort=createdAt,asc"
          : `page=${page - 1}&size=6&sort=createdAt,asc`,
    });

    return (
      <MyReviewsPageView
        reviews={reviews?.data}
        total={reviews?.totalResults}
      />
    );
  } catch (error) {
    notFound();
  }
}
