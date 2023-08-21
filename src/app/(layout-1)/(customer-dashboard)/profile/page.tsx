import { Metadata } from "next";
import { ProfilePageView } from "pages-sections/customer-dashboard/profile/page-view";
// API FUNCTIONS
import api from "utils/__api__/users";

export const metadata: Metadata = {
  title: "Profile - Next.js E-commerce Template",
  description: "Bazaar Profile Page View",
};

export default async function Profile() {
  const user = await api.getUser();
  return <ProfilePageView user={user} />;
}
