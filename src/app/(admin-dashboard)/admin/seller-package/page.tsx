import { Metadata } from "next";
import { SellerPackagePageView } from "pages-sections/vendor-dashboard/seller-package/page-view";

export const metadata: Metadata = {
  title: "Seller Package - Next.js E-commerce Template",
  description: "Bazaar Vendor Dashboard Page View",
};

export default async function SellerPackage() {
  return <SellerPackagePageView />;
}
