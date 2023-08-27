import { Metadata } from "next";
import { AccountSettingsPageView } from "pages-sections/vendor-dashboard/account-settings/page-view";

export const metadata: Metadata = {
  title: "Account Settings - Next.js E-commerce Template",
  description: "Bazaar Vendor Dashboard Page View",
};

export default function AccountSettings() {
  return <AccountSettingsPageView />;
}
