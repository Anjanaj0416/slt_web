import { Metadata } from "next";
import { GadgetShopPageView } from "pages-sections/gadget-shop/page-view";

export const metadata: Metadata = {
  title: "Gadget Shop - Next.js E-commerce Template",
  description: "Bazaar Gadget Shop Page View",
};

export default function GadgetShop() {
  return <GadgetShopPageView />;
}
