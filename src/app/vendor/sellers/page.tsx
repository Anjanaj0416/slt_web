import { Metadata } from "next";
import { SellersPageView } from "pages-sections/vendor-dashboard/sellers/page-view";
// API FUNCTIONS
import api from "utils/__api__/dashboard";

export const metadata: Metadata = {
  title: "Sellers - Next.js E-commerce Template",
  description: "Bazaar Vendor Dashboard Page View",
};

export default async function Sellers() {
  const sellers = await api.sellers();
  return <SellersPageView sellers={sellers} />;
}
