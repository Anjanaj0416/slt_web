import { Metadata } from "next";
import { VendorPayoutRequestsPageView } from "pages-sections/vendor-dashboard/v-payout-request/page-view";
// API FUNCTIONS
import api from "utils/__api__/vendor";

export const metadata: Metadata = {
  title: "Payout Requests - Next.js E-commerce Template",
  description: "Bazaar Vendor Dashboard Page View",
};

export default async function PayoutRequests() {
  const requests = await api.getAllPayoutRequests();
  return <VendorPayoutRequestsPageView payoutRequests={requests} />;
}
