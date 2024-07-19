import { Metadata } from "next";
import { notFound } from "next/navigation";
// PAGE VIEW COMPONENT
import { ShopsPageView } from "pages-sections/shops/page-view";
import request from "utils/request";
import API from "constants/store";

export const metadata: Metadata = {
  title: "Shops - Bazaar Next.js E-commerce Template",
  description: `Bazaar is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [{ name: "UI-LIB", url: "https://ui-lib.com" }],
  viewport: "width=device-width, initial-scale=1",
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};

export default async function Shops() {
  try {
    const stores = await request(API.GET_STORES, {
      query: "storeStatus=PUBLISHED&&sort=name,asc&size=9",
    });
    return <ShopsPageView storesData={stores} />;
  } catch (error) {
    notFound();
  }
}
