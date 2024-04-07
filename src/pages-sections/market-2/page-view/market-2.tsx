import Box from "@mui/material/Box";
import { Fragment } from "react";
//LOCAL CUSTOM COMPONENTS
import AnimatedCategoryList from "../animated-category-list";
import CategoryBasedProducts from "../category-based-products";
import FullBanner from "../full-banner";
import HalfBanner from "../half-banner";
import Section1 from "../section-1";
import Section4 from "../section-4";
import Section8 from "../section-8";
import SelectedProducts from "../selected-products";
import ThreeBanner from "../three-banner";
// API FUNCTIONS
import PRODUCT_API from "constants/products";
import BANNER_API from "constants/banners";
import CATEGORY_API from "constants/categories";
import api from "utils/__api__/market-2";
import request from "utils/request";
import { notFound } from "next/navigation";

const MarketTwoPageView = async () => {
  try {
    const products = await request(PRODUCT_API.GET_PRODUCTS, { query: "size=5" });

    const mainCategories = await request(CATEGORY_API.GET_CATEGORIES, {
      query: "size=10&productsCountMoreThan=3",
    });

    const categories = await request(CATEGORY_API.GET_CATEGORIES, {
      query: "size=6&categoryType=PRODUCT&categoryStatus=APPROVED",
    });
    const fullBanners = await request(BANNER_API.GET_BANNERS, {
      query: "size=3&bannerType=FULL",
    });
    const halfBanners = await request(BANNER_API.GET_BANNERS, {
      query: "size=4&bannerType=HALF",
    });
    const threeBanners = await request(BANNER_API.GET_BANNERS, {
      query: "size=4&bannerType=THREE",
    });
    const brands = await api.getBrands();
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
          <AnimatedCategoryList categories={categories?.data} />

          {/* DEALS OF THE DAY AND OFFER BANNERS */}
          <Section4 products={products?.data} />

          {/* TOP OFFER BANNERS */}
          <ThreeBanner data={threeBanners?.data.slice(0, 3)} />

          {/* CATEGORY BASED PRODUCTS */}
          {mainCategories.data?.slice(0, 5).map(async (category, index) => (
            <Fragment key={category.id}>
              <CategoryBasedProducts data={category} />
              {index % 2 === 0 ? (
                <FullBanner data={fullBanners.data?.pop()} />
              ) : (
                <HalfBanner
                  data={[halfBanners.data?.pop(), halfBanners.data?.pop()]}
                />
              )}
            </Fragment>
          ))}

          {/*  FEATURED BRANDS */}
          <Section8 brands={brands} />

          {/* SELECTED PRODUCTS */}
          <SelectedProducts />
        </Box>

        {/* POPUP NEWSLETTER FORM */}
        {/* <Newsletter /> */}

        {/* SETTINGS IS USED ONLY FOR DEMO, YOU CAN REMOVE THIS */}
        {/* <Setting /> */}
      </Fragment>
    );
  } catch (error) {
    notFound();
  }
};

export default MarketTwoPageView;
