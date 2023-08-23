import { Metadata } from "next";
import { EditCategoryPageView } from "pages-sections/vendor-dashboard/categories/page-view";

export const metadata: Metadata = {
  title: "Edit Category - Next.js E-commerce Template",
  description: "Bazaar Vendor Dashboard Page View",
};

export default function EditCategory() {
  return <EditCategoryPageView />;
}
