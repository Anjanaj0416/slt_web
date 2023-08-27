import { Metadata } from "next";
import { DashboardPageView } from "pages-sections/vendor-dashboard/dashboard/page-view";

export const metadata: Metadata = {
  title: "Vendor Dashboard - Next.js E-commerce Template",
  description: "Bazaar Vendor Dashboard Page View",
};

export default async function VendorDashboard() {
  return <DashboardPageView />;
}
