import { Metadata } from "next";
import { OrderConfirmationPageView } from "pages-sections/order-confirmation";

export const metadata: Metadata = {
  title: "Order Confirmation - Next.js E-commerce Template",
  description: "Bazaar Order Confirmation Page View",
};

export default function OrderConfirmation() {
  return <OrderConfirmationPageView />;
}
