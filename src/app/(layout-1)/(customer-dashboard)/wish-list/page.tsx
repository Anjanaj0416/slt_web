import { Metadata } from "next";
import { WishListPageView } from "pages-sections/customer-dashboard/wish-list";
// API FUNCTIONS
import { getWishListProducts } from "utils/__api__/wish-list";

export const metadata: Metadata = {
  title: "Wish List - Next.js E-commerce Template",
  description: "Bazaar Wish List Page View",
};

export default async function WishList({ searchParams }) {
  const { products, totalProducts } = await getWishListProducts(searchParams.page);
  return <WishListPageView products={products} totalProducts={totalProducts} />;
}
