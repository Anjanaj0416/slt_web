import { Metadata } from "next";
import { PaymentPageView } from "pages-sections/payment/page-view";

export const metadata: Metadata = {
  title: "Payment - TRADEZ ",
  description: `TRADEZ is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,

  viewport: "width=device-width, initial-scale=1",
  keywords: ["Tradez"],
};

export default function Payment() {
  return <PaymentPageView type="CART" />;
}
