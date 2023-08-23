import { Metadata } from "next";
import { CreateCategoryPageView } from "pages-sections/vendor-dashboard/categories/page-view";

export const metadata: Metadata = {
  title: "Create Category - Next.js E-commerce Template",
  description: "Bazaar Vendor Dashboard Page View",
};

export default function CreateCategory() {
  return <CreateCategoryPageView />;
}
