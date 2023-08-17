import { Metadata } from "next";
import { GiftShopPageView } from "pages-sections/gift-shop/page-view";

export const metadata: Metadata = {
  title: "Gift Shop - Next.js E-commerce Template",
  description: "Bazaar Gift Shop Page View",
};

export default function GiftShop() {
  return <GiftShopPageView />;
}
