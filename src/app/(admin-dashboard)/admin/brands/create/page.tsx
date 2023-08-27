import { Metadata } from "next";
import { CreateBrandPageView } from "pages-sections/vendor-dashboard/brands/page-view";

export const metadata: Metadata = {
  title: "Brand Create - Next.js E-commerce Template",
  description: "Bazaar Vendor Dashboard Page View",
};

export default function BrandCreate() {
  return <CreateBrandPageView />;
}
