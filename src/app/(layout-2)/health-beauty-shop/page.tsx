import { Metadata } from "next";
import { HealthBeautyPageView } from "pages-sections/health-beauty-shop/page-view";
// API FUNCTIONS
import api from "utils/__api__/healthbeauty-shop";

export const metadata: Metadata = {
  title: "Health & Beauty - Next.js E-commerce Template",
  description: "Bazaar Health & Beauty Page View",
};

export default async function HealthBeauty() {
  const serviceList = await api.getServices();
  const allProducts = await api.getProducts();
  const navigationList = await api.getNavigation();
  const topNewProducts = await api.getTopNewProducts();
  const mainCarouselData = await api.getMainCarousel();

  return (
    <HealthBeautyPageView
      serviceList={serviceList}
      allProducts={allProducts}
      navigationList={navigationList}
      topNewProducts={topNewProducts}
      mainCarouselData={mainCarouselData}
    />
  );
}
