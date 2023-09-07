import { Metadata } from "next";
import { GroceryThreePageView } from "pages-sections/grocery-3/page-view";
// API FUNCTIONS
import api from "utils/__api__/grocery-3";

export const metadata: Metadata = {
  title: "Grocery 3 - Next.js E-commerce Template",
  description: "Bazaar Grocery 3 Page View",
};

export default async function GroceryThree() {
  const offerCards = await api.getOfferCards();
  const allProducts = await api.getAllProducts();
  const mainCarouselData = await api.getMainCarousel();
  const topSailedProducts = await api.getTopSailedProducts();

  return (
    <GroceryThreePageView
      offerCards={offerCards}
      allProducts={allProducts}
      mainCarouselData={mainCarouselData}
      topSailedProducts={topSailedProducts}
    />
  );
}
