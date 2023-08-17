import { Metadata } from "next";
import { FurnitureShopPageView } from "pages-sections/furniture-shop/page-view";

export const metadata: Metadata = {
  title: "Furniture Shop - Next.js E-commerce Template",
  description: "Bazaar Furniture Shop Page View",
};

export default function FurnitureShop() {
  return <FurnitureShopPageView />;
}
