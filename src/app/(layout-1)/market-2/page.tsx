import { Metadata } from "next";
import { MarketTwoPageView } from "pages-sections/market-2/page-view";

export const metadata: Metadata = {
  title: "Market 2 - Next.js E-commerce Template",
  description: "Bazaar Market 2 Page View",
};

export default function MarketTwo() {
  return <MarketTwoPageView />;
}
