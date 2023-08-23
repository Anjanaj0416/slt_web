import { Metadata } from "next";
import { EditProductPageView } from "pages-sections/vendor-dashboard/products/page-view";

export const metadata: Metadata = {
  title: "Product - Next.js E-commerce Template",
  description: "Bazaar Vendor Dashboard Page View",
};

export default function ProductEdit() {
  return <EditProductPageView />;
}
