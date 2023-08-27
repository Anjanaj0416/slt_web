import { Metadata } from "next";
import { PayoutRequestsPageView } from "pages-sections/vendor-dashboard/payout-requests/page-view";
// API FUNCTIONS
import api from "utils/__api__/dashboard";

export const metadata: Metadata = {
  title: "Payout Requests - Next.js E-commerce Template",
  description: "Bazaar Vendor Dashboard Page View",
};

export default async function PayoutRequests() {
  const requests = await api.payoutRequests();
  return <PayoutRequestsPageView requests={requests} />;
}
