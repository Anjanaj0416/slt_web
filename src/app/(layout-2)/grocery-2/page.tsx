import { Metadata } from "next";
import { GroceryTwoPageView } from "pages-sections/grocery-2/page-view";
// API FUNCTIONS
import api from "utils/__api__/grocery2-shop";

export const metadata: Metadata = {
  title: "Grocery 2 - Next.js E-commerce Template",
  description: "Bazaar Grocery 2 Page View",
};

export default async function GroceryTwo() {
  const serviceList = await api.getServices();
  const categories = await api.getCategories();
  const testimonials = await api.getTestimonials();
  const dairyProducts = await api.getDairyProducts();
  const navigationList = await api.getNavigationList();
  const mainCarouselData = await api.getMainCarousel();
  const featuredProducts = await api.getFeaturedProducts();
  const bestHomeProducts = await api.getBestHomeProducts();
  const bestSellProducts = await api.getBestSellProducts();
  const discountBanners = await api.getDiscountBannerList();

  return (
    <GroceryTwoPageView
      categories={categories}
      serviceList={serviceList}
      testimonials={testimonials}
      dairyProducts={dairyProducts}
      navigationList={navigationList}
      discountBanners={discountBanners}
      bestHomeProducts={bestHomeProducts}
      bestSellProducts={bestSellProducts}
      mainCarouselData={mainCarouselData}
      featuredProducts={featuredProducts}
    />
  );
}
