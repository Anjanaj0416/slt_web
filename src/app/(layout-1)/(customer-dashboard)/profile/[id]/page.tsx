import { Metadata } from "next";
import { ProfileEditPageView } from "pages-sections/customer-dashboard/profile/page-view";
// API FUNCTIONS

export const metadata: Metadata = {
  title: "Profile - TRADEZ ",
  description: `TRADEZ is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,

  viewport: "width=device-width, initial-scale=1",
  keywords: ["Tradez"],
};

export default async function ProfileEdit() {
  return <ProfileEditPageView />;
}
