import { Metadata } from "next";
import { PaymentPageView } from "pages-sections/payment/page-view";

export const metadata: Metadata = {
  title: "Payment - Next.js E-commerce Template",
  description: "Bazaar Payment Page View",
};

export default function Payment() {
  return <PaymentPageView />;
}
