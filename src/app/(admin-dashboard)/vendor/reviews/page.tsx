import { Metadata } from "next";
import { ReviewsPageView } from "pages-sections/vendor-dashboard/reviews/page-view";
// API FUNCTIONS
import api from "utils/__api__/vendor";

export const metadata: Metadata = {
  title: "Reviews - Next.js E-commerce Template",
  description: "Bazaar Vendor Dashboard Page View",
};

export default async function Reviews() {
  const reviews = await api.getAllProductReviews();
  return <ReviewsPageView reviews={reviews} />;
}
