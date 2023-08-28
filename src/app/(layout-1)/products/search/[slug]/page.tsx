import { Metadata } from "next";
// PAGE VIEW COMPONENT
import { ProductSearchPageView } from "pages-sections/product-details/page-view";

export const metadata: Metadata = {
  title: "Product Search - Next.js E-commerce Template",
  description: "Bazaar Product Search Page View",
};

export default async function ProductSearch({ params }) {
  return <ProductSearchPageView />;
}
