import { Metadata } from "next";
import { GroceryOnePageView } from "pages-sections/grocery-1/page-view";
// API FUNCTIONS
import api from "utils/__api__/grocery-1";

export const metadata: Metadata = {
  title: "Grocery 1 - Next.js E-commerce Template",
  description: "Bazaar Grocery 1 Page View",
};

export default async function GroceryOne() {
  const products = await api.getProducts();
  const serviceList = await api.getServices();
  const popularProducts = await api.getPopularProducts();
  const trendingProducts = await api.getTrendingProducts();
  const grocery1NavList = await api.getGrocery1Navigation();

  return (
    <GroceryOnePageView
      products={products}
      serviceList={serviceList}
      popularProducts={popularProducts}
      grocery1NavList={grocery1NavList}
      trendingProducts={trendingProducts}
    />
  );
}
