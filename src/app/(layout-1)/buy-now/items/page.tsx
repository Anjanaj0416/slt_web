import { Metadata } from "next";
import BuyingItemsPageView from "pages-sections/buy-now/items/page-view/items";
// PAGE VIEW COMPONENT

export const metadata: Metadata = {
  title: "Buy Now - TRADEZ ",
  description: `TRADEZ is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [{ name: "UI-LIB", url: "https://ui-lib.com" }],
  viewport: "width=device-width, initial-scale=1",
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};

export default function Shops() {
  return <BuyingItemsPageView />;
}
