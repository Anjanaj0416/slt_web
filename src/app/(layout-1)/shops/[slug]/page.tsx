import { Metadata } from "next";
import { notFound } from "next/navigation";
// API FUNCTIONS
import api from "utils/__api__/shop";
// PAGE VIEW COMPONENT
import { ShopDetailsPageView } from "pages-sections/shops/page-view";

export const metadata: Metadata = {
  title: "Shop Details - Next.js E-commerce Template",
  description: "Bazaar Shop Details Page View",
};

export default async function ShopDetails({ params }) {
  try {
    const shop = await api.getProductsBySlug(String(params.slug));
    return <ShopDetailsPageView shop={shop} />;
  } catch (error) {
    notFound();
  }
}
