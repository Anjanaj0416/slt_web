import { Fragment } from "react";
import Box from "@mui/material/Box";
//LOCAL CUSTOM COMPONENTS
import Offers from "../offers";
import Section1 from "../section-1";
import Section3 from "../section-3";
import Section4 from "../section-4";
import CategoryBasedProducts from "../category-based-products";
import HalfBanner from "../half-banner";
import FullBanner from "../full-banner";
import Section8 from "../section-8";
import Section9 from "../section-9";
// API FUNCTIONS
import api from "utils/__api__/market-2";
import { getServerSession } from "next-auth";
import request from "utils/request";
import API from "constants/products";

const MarketTwoPageView = async () => {
  const products = await request(API.GET_PRODUCTS, { query: "size=5" });
  const categories = await request(API.GET_CATEGORIES, {
    query: "size=5&categoryType=PRODUCT&parentCategoryId=null",
  });
  const fullBanners = await request(API.GET_BANNERS, { query: "size=3&bannerType=FULL" });
  const halfBanners = await request(API.GET_BANNERS, { query: "size=4&bannerType=HALF" });
  const brands = await api.getBrands();
  const categories2 = await api.getCategories();
  const mainCarouselData = await api.getMainCarouselData();
  //const serviceList = await api.getServices();
  // const menFashionProducts = await api.getMenFashionProducts();
  // const electronicsProducts = await api.getElectronicsProducts();
  // const womenFashionProducts = await api.getWomenFashionProducts();

  return (
    <Fragment>
      <Box bgcolor="#F6F6F6">
        {/* HERO SLIDER AND GRID */}
        <Section1 carouselData={mainCarouselData} />

        {/* SERVICE CARDS */}
        {/* <Section2 serviceList={serviceList} /> */}

        {/* CATEGORIES AND ANIMATED OFFER BANNER */}
        <Section3 categories={categories2} />

        {/* DEALS OF THE DAY AND OFFER BANNERS */}
        <Section4 products={products?.data} />

        {/* TOP OFFER BANNERS */}
        <Offers />

        {/* CATEGORY BASED PRODUCTS */}
        {categories.data?.map(async (category, index) => (
          <Fragment key={category.id}>
            <CategoryBasedProducts data={category} />
            {index % 2 === 0 ? (
              <FullBanner data={fullBanners.data?.pop()} />
            ) : (
              <HalfBanner data={[halfBanners.data?.pop(), halfBanners.data?.pop()]} />
            )}
          </Fragment>
        ))}
        
        {/*  FEATURED BRANDS */}
        <Section8 brands={brands} />

        {/* SELECTED PRODUCTS */}
        <Section9 />
      </Box>

      {/* POPUP NEWSLETTER FORM */}
      {/* <Newsletter /> */}

      {/* SETTINGS IS USED ONLY FOR DEMO, YOU CAN REMOVE THIS */}
      {/* <Setting /> */}
    </Fragment>
  );
};

export default MarketTwoPageView;
