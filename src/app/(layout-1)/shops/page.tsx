import { Metadata } from "next";
import { notFound } from "next/navigation";
// PAGE VIEW COMPONENT
import { ShopsPageView } from "pages-sections/shops/page-view";
import request, { cachedRequest } from "utils/request";
import API from "constants/store";

export const metadata: Metadata = {
  title: "Shops - TRADEZ ",
  description: `TRADEZ is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,

  viewport: "width=device-width, initial-scale=1",
  keywords: ["Tradez"],
};

export default async function Shops() {
  try {
    const query = "storeStatus=PUBLISHED&sort=name,asc&size=9";
    const stores = await cachedRequest(API.GET_STORES, {
      query,
    });
    return <ShopsPageView storesData={stores} />;
  } catch (error) {
    console.error(error);
    notFound();
  }
}
