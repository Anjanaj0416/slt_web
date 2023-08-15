import type { Metadata } from "next";
import { ResetPasswordPageView } from "pages-sections/sessions/page-view";

export const metadata: Metadata = {
  title: "Reset Password - Next.js E-commerce Template",
  description: "Bazaar Reset Password Page View",
};

export default function ResetPassword() {
  return <ResetPasswordPageView />;
}
