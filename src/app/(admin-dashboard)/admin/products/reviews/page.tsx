import { Metadata } from "next";
import { ProductReviewsPageView } from "pages-sections/vendor-dashboard/products/page-view";
// API FUNCTIONS
import api from "utils/__api__/dashboard";

export const metadata: Metadata = {
  title: "Product Reviews - Next.js E-commerce Template",
  description: "Bazaar Vendor Dashboard Page View",
};

export default async function ProductReviews() {
  const reviews = await api.reviews();
  return <ProductReviewsPageView reviews={reviews} />;
}
