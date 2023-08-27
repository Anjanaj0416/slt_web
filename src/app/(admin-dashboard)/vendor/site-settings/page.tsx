import { Metadata } from "next";
import { SiteSettingsPageView } from "pages-sections/vendor-dashboard/site-settings/page-view";

export const metadata: Metadata = {
  title: "Site Settings - Next.js E-commerce Template",
  description: "Bazaar Vendor Dashboard Page View",
};

export default function SiteSettings() {
  return <SiteSettingsPageView />;
}
