import { Metadata } from "next";
import { CheckoutPageView } from "pages-sections/checkout/page-view";

export const metadata: Metadata = {
  title: "Checkout - Next.js E-commerce Template",
  description: "Bazaar Checkout Page View",
};

export default function Checkout() {
  return <CheckoutPageView />;
}
