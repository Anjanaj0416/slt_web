import { Metadata } from "next";
import { SalesOnePageView } from "pages-sections/sales/page-view";

export const metadata: Metadata = {
  title: "Sales 1 - Next.js E-commerce Template",
  description: "Bazaar Sales 1 Page View",
};

export default function SalesOne() {
  return <SalesOnePageView />;
}
