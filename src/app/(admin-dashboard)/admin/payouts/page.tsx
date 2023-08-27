import { Metadata } from "next";
import { PayoutsPageView } from "pages-sections/vendor-dashboard/payouts/page-view";
// API FUNCTIONS
import api from "utils/__api__/dashboard";

export const metadata: Metadata = {
  title: "Payouts - Next.js E-commerce Template",
  description: "Bazaar Vendor Dashboard Page View",
};

export default async function Payouts() {
  const payouts = await api.payouts();
  return <PayoutsPageView payouts={payouts} />;
}
