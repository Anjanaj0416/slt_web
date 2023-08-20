import { Metadata } from "next";
import { notFound } from "next/navigation";
// API FUNCTIONS
import api from "utils/__api__/shop";
// PAGE VIEW COMPONENT
import { ShopsPageView } from "pages-sections/shops/page-view";

export const metadata: Metadata = {
  title: "Shops - Next.js E-commerce Template",
  description: "Bazaar Shop Page View",
};

export default async function Shops() {
  try {
    const shops = await api.getShopList();
    return <ShopsPageView shops={shops} />;
  } catch (error) {
    notFound();
  }
}
