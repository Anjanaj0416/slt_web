import { Metadata } from "next";
import { CartPageView } from "pages-sections/cart/page-view";

export const metadata: Metadata = {
  title: "Cart - Next.js E-commerce Template",
  description: "Bazaar Cart Page View",
};

export default function Cart() {
  return <CartPageView />;
}
