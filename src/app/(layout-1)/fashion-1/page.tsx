import { Metadata } from "next";
import { FashionOnePageView } from "pages-sections/fashion-1/page-view";

export const metadata: Metadata = {
  title: "Fashion 1 - Next.js E-commerce Template",
  description: "Bazaar Fashion 1 Page View",
};

export default function FashionShopOne() {
  return <FashionOnePageView />;
}
