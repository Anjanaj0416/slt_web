import type { Metadata } from "next";
import { RegisterPageView } from "pages-sections/sessions/page-view";

export const metadata: Metadata = {
  title: "Register - Next.js E-commerce Template",
  description: "Bazaar Register Page View",
};

export default function Register() {
  return <RegisterPageView />;
}
