import { Metadata } from "next";
import { RefundSettingPageView } from "pages-sections/vendor-dashboard/refund-setting/page-view";

export const metadata: Metadata = {
  title: "Refund Setting - Next.js E-commerce Template",
  description: "Bazaar Vendor Dashboard Page View",
};

export default async function RefundSetting() {
  return <RefundSettingPageView />;
}
