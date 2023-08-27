import { Metadata } from "next";
import { EarningHistoryPageView } from "pages-sections/vendor-dashboard/earning-history/page-view";
// API FUNCTIONS
import api from "utils/__api__/dashboard";

export const metadata: Metadata = {
  title: "Earning History - Next.js E-commerce Template",
  description: "Bazaar Vendor Dashboard Page View",
};

export default async function EarningHistory() {
  const earnings = await api.earningHistory();
  return <EarningHistoryPageView earnings={earnings} />;
}
