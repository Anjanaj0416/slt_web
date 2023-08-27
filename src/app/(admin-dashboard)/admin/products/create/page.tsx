import { Metadata } from "next";
import { ProductCreatePageView } from "pages-sections/vendor-dashboard/products/page-view";

export const metadata: Metadata = {
  title: "Product Create - Next.js E-commerce Template",
  description: "Bazaar Vendor Dashboard Page View",
};

export default function ProductCreate() {
  return <ProductCreatePageView />;
}
