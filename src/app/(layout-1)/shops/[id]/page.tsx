import { Metadata } from "next";
import { notFound } from "next/navigation";
// PAGE VIEW COMPONENT
import { ShopDetailsPageView } from "pages-sections/shops/page-view";
import request, { cachedRequest } from "utils/request";
import STORE_API from "constants/store";
import PRODUCT_API from "constants/products";

export const metadata: Metadata = {
  title: "Shop Details - TRADEZ ",
  description: `TRADEZ is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [{ name: "UI-LIB", url: "https://ui-lib.com" }],
  viewport: "width=device-width, initial-scale=1",
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};

export default async function ShopDetails({ params }) {
  try {
    const storeId = params.id?.split("_")?.[0];
    const [store, productsData] = await Promise.all([
      cachedRequest(STORE_API.GET_STORE, { id: storeId }),
      cachedRequest(PRODUCT_API.GET_PRODUCTS_BY_STORE_ID, {
        storeId,
        query: "size=9",
      }),
    ]);

    return <ShopDetailsPageView store={store} productsData={productsData} />;
  } catch (error) {
    console.error(error);
    notFound();
  }
}
