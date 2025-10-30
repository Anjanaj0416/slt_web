import { Metadata } from "next";
import { CartPageView } from "pages-sections/cart/page-view";

export const metadata: Metadata = {
  title: "Cart - TRADEZ ",
  description: `TRADEZ is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  viewport: "width=device-width, initial-scale=1",
  keywords: ["Tradez"],
};

export default function Cart() {
  return <CartPageView />;
}
