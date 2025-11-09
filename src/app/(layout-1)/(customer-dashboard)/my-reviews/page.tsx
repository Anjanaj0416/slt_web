import { Metadata } from "next";
import { cachedRequest } from "utils/request";
import API from "constants/review";
import { notFound } from "next/navigation";
import { auth } from "utils/auth";
import MyReviewsPageView from "pages-sections/customer-dashboard/my-reviews/my-reviews";

export const metadata: Metadata = {
  title: "Wishlist - TRADEZ ",
  description: `TRADEZ is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,

  viewport: "width=device-width, initial-scale=1",
  keywords: ["Tradez"],
};

export default async function WishList({ searchParams }) {
  try {
    const page = searchParams?.page;
    const { user } = await auth();
    const safePage = Number.isInteger(page) && page > 0 ? page : 1;
    const query = `page=${safePage - 1}&size=10&sort=createdAt,asc`;

    const reviews = await cachedRequest(API.GET_USER_REVIEWS, {
      userId: user.id,
      query,
    });

    return (
      <MyReviewsPageView
        reviews={reviews?.data}
        total={reviews?.totalResults}
      />
    );
  } catch (error) {
    console.error(error);
    notFound();
  }
}
