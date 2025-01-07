import { ShopLayout1 } from "components/layouts/shop-layout-1";
import { Metadata } from "next";
import { MarketTwoPageView } from "pages-sections/market-2/page-view";

export const metadata: Metadata = {
  title: "TRADEZ",
  description: `TRADEZ is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [{ name: "UI-LIB", url: "https://ui-lib.com" }],
  viewport: "width=device-width, initial-scale=1",
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};

export default function IndexPage() {
  return (
    <ShopLayout1>
      <MarketTwoPageView />
    </ShopLayout1>
  );
}
