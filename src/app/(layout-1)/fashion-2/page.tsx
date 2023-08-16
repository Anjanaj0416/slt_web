import { Metadata } from "next";
import { FashionTwoPageView } from "pages-sections/fashion-2/page-view";

export const metadata: Metadata = {
  title: "Fashion 2 - Next.js E-commerce Template",
  description: "Bazaar Fashion 2 Page View",
};

export default function FashionShopTwo() {
  return <FashionTwoPageView />;
}
