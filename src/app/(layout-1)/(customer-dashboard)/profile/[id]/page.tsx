import { Metadata } from "next";
import { ProfileEditPageView } from "pages-sections/customer-dashboard/profile/page-view";
// API FUNCTIONS
import api from "utils/__api__/users";

export const metadata: Metadata = {
  title: "Profile - Next.js E-commerce Template",
  description: "Bazaar Profile Page View",
};

export default async function ProfileEdit() {
  const user = await api.getUser();
  return <ProfileEditPageView user={user} />;
}
