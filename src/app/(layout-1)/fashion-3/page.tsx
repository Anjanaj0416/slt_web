import { Metadata } from "next";
import { FashionThreePageView } from "pages-sections/fashion-3/page-view";

export const metadata: Metadata = {
  title: "Fashion 3 - Next.js E-commerce Template",
  description: "Bazaar Fashion 3 Page View",
};

export default function FashionShopThree() {
  return <FashionThreePageView />;
}
