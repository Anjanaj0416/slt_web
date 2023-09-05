import { Metadata } from "next";
import { PaymentDetailsPageView } from "pages-sections/customer-dashboard/payment-methods/page-view";

export const metadata: Metadata = {
  title: "Payment Details - Next.js E-commerce Template",
  description: "Bazaar Payment Details Page View",
};

export default async function PaymentMethodDetails() {
  return <PaymentDetailsPageView />;
}
