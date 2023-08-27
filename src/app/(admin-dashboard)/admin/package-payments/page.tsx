import { Metadata } from "next";
import { PackagePaymentPageView } from "pages-sections/vendor-dashboard/package-payments/page-view";
// API FUNCTIONS
import api from "utils/__api__/dashboard";

export const metadata: Metadata = {
  title: "Package Payments - Next.js E-commerce Template",
  description: "Bazaar Vendor Dashboard Page View",
};

export default async function PackagePayments() {
  const payments = await api.packagePayments();
  return <PackagePaymentPageView payments={payments} />;
}
