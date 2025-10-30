import { Metadata } from "next";
import { OrderConfirmationPageView } from "pages-sections/order-confirmation";

export const metadata: Metadata = {
  title: "Order Confirmation - TRADEZ ",
  description: `TRADEZ is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,

  viewport: "width=device-width, initial-scale=1",
  keywords: ["Tradez"],
};

export default function OrderConfirmation() {
  return <OrderConfirmationPageView />;
}
