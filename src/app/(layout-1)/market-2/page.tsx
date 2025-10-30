import { Metadata } from "next";
import { MarketTwoPageView } from "pages-sections/market-2/page-view";

export const metadata: Metadata = {
  title: "Market 2 - TRADEZ ",
  description: `TRADEZ is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,

  viewport: "width=device-width, initial-scale=1",
  keywords: ["Tradez"],
};

export default function MarketTwo() {
  return <MarketTwoPageView />;
}
