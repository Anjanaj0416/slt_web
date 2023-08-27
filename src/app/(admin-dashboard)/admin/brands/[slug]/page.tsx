import { Metadata } from "next";
import { EditBrandPageView } from "pages-sections/vendor-dashboard/brands/page-view";

export const metadata: Metadata = {
  title: "Edit Brand - Next.js E-commerce Template",
  description: "Bazaar Vendor Dashboard Page View",
};

export default function BrandEdit() {
  return <EditBrandPageView />;
}
