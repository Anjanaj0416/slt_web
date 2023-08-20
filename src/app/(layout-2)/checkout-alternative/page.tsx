import { Metadata } from "next";
import { CheckoutAlternativePageView } from "pages-sections/checkout/page-view";

export const metadata: Metadata = {
  title: "Checkout Alternative - Next.js E-commerce Template",
  description: "Bazaar Checkout Alternative Page View",
};

export default async function CheckoutAlternative() {
  return <CheckoutAlternativePageView />;
}
