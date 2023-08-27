import { Metadata } from "next";
import { PayoutSettingsPageView } from "pages-sections/vendor-dashboard/payout-settings/page-view";

export const metadata: Metadata = {
  title: "Payout Settings - Next.js E-commerce Template",
  description: "Bazaar Vendor Dashboard Page View",
};

export default function PayoutSettings() {
  return <PayoutSettingsPageView />;
}
