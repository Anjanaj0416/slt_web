import { Metadata } from "next";
import { SalesTwoPageView } from "pages-sections/sales/page-view";

export const metadata: Metadata = {
  title: "Sales 2 - Next.js E-commerce Template",
  description: "Bazaar Sales 2 Page View",
};

export default function SalesTwo() {
  return <SalesTwoPageView />;
}
