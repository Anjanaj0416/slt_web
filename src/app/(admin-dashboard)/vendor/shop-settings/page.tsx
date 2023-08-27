import { Metadata } from "next";
import { ShopSettingsPageView } from "pages-sections/vendor-dashboard/shop-settings/page-view";

export const metadata: Metadata = {
  title: "Shop Settings - Next.js E-commerce Template",
  description: "Bazaar Vendor Dashboard Page View",
};

export default function ShopSettings() {
  return <ShopSettingsPageView />;
}
