import { Metadata } from "next";
import { RefundRequestPageView } from "pages-sections/vendor-dashboard/refund-request/page-view";
// API FUNCTIONS
import api from "utils/__api__/dashboard";

export const metadata: Metadata = {
  title: "Refund Request - Next.js E-commerce Template",
  description: "Bazaar Vendor Dashboard Page View",
};

export default async function RefundRequest() {
  const requests = await api.refundRequests();
  return <RefundRequestPageView requests={requests} />;
}
