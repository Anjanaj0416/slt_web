import { Metadata } from "next";
import { ProductsPageView } from "pages-sections/vendor-dashboard/products/page-view";
// API FUNCTIONS
import api from "utils/__api__/dashboard";

export const metadata: Metadata = {
  title: "Products - Next.js E-commerce Template",
  description: "Bazaar Vendor Dashboard Page View",
};

export default async function Products() {
  const products = await api.products();
  return <ProductsPageView products={products} />;
}
