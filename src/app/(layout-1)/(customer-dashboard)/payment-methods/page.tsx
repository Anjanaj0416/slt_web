import { Metadata } from "next";
import { PaymentMethodsPageView } from "pages-sections/customer-dashboard/payment-methods/page-view";

export const metadata: Metadata = {
  title: "Payment Methods - Next.js E-commerce Template",
  description: "Bazaar Payment Methods Page View",
};

export default async function PaymentMethods() {
  return <PaymentMethodsPageView />;
}
