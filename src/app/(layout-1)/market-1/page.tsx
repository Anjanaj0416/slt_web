import { Metadata } from "next";
import { MarketOnePageView } from "pages-sections/market-1/page-view";

export const metadata: Metadata = {
  title: "Market 1 - Next.js E-commerce Template",
  description: "Bazaar Market 1 Page View",
};

export default async function MarketOne() {
  return <MarketOnePageView />;
}
