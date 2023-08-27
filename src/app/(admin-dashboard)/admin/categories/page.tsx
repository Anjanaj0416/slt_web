import { Metadata } from "next";
import { CategoriesPageView } from "pages-sections/vendor-dashboard/categories/page-view";
// API FUNCTIONS
import api from "utils/__api__/dashboard";

export const metadata: Metadata = {
  title: "Categories - Next.js E-commerce Template",
  description: "Bazaar Vendor Dashboard Page View",
};

export default async function Categories() {
  const categories = await api.category();
  return <CategoriesPageView categories={categories} />;
}
