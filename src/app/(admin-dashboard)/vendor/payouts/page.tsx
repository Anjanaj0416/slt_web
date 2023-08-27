import { Metadata } from "next";
import { VendorPayoutsPageView } from "pages-sections/vendor-dashboard/v-payouts/page-view";
// API FUNCTIONS
import api from "utils/__api__/dashboard";

export const metadata: Metadata = {
  title: "Vendor Payouts - Next.js E-commerce Template",
  description: "Bazaar Vendor Dashboard Page View",
};

export default async function VendorPayouts() {
  const payouts = await api.payouts();
  return <VendorPayoutsPageView payouts={payouts} />;
}
