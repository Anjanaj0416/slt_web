import type { Metadata } from "next";
import { LoginPageView } from "pages-sections/sessions/page-view";

export const metadata: Metadata = {
  title: "Login - Next.js E-commerce Template",
  description: "Bazaar Login Page View",
};

export default function Login() {
  return <LoginPageView />;
}
