import Box from "@mui/material/Box";
import { cache, Fragment } from "react";
//LOCAL CUSTOM COMPONENTS
import AnimatedCategoryList from "../animated-category-list";
import AllProducts from "../allproducts";
import Section1 from "../section-1";
import Section4 from "../section-4";
import ThreeBanner from "../three-banner";
// API FUNCTIONS
import PRODUCT_API from "constants/products";
import BANNER_API from "constants/banners";
import CATEGORY_API from "constants/categories";
import request from "utils/request";
import { notFound } from "next/navigation";
import MobileBannerSection from "../mobile-banner-section";
import SelectedProducts from "../selected-products";

const cachedRequest = cache((url: Object, options: any) =>
  request(url, options)
);

const MarketTwoPageView = async () => {
  try {
    const [
      products,
      categories,
      fullBanners,
      halfBanners,
      threeBanners,
      mainCarouselData,
      topBanners,
      topCategories,
    ] = await Promise.all([
      cachedRequest(PRODUCT_API.GET_PRODUCTS, {
        query: "size=30&isDiscount=true",
      }),
      cachedRequest(CATEGORY_API.GET_CATEGORIES, {
        query:
          "size=12&categoryType=PRODUCT&parentCategoryId=null&categoryStatus=APPROVED",
      }),
      cachedRequest(BANNER_API.GET_BANNERS, {
        query: "size=2&bannerType=FULL&sort=index,asc",
      }),
      cachedRequest(BANNER_API.GET_BANNERS, {
        query: "size=2&bannerType=HALF&sort=index,asc",
      }),
      cachedRequest(BANNER_API.GET_BANNERS, {
        query: "size=4&bannerType=THREE&sort=index,asc",
      }),
      cachedRequest(BANNER_API.GET_BANNERS, {
        query: "size=6&bannerType=CAROUSEL&sort=index,asc",
      }),
      cachedRequest(BANNER_API.GET_BANNERS, {
        query: "size=2&bannerType=HALF_TOP&sort=index,asc",
      }),
      cachedRequest(CATEGORY_API.GET_CATEGORIES, {
        query:
          "productsCountMoreThan=5&categoryType=PRODUCT&categoryStatus=APPROVED&size=3",
      }),
    ]);
    return (
      <Fragment>
        <Box
          bgcolor="#F6F6F6"
          sx={{
            px: { xs: 2, md: 16 },
            pb: 4,
          }}
        >
          {/* HERO SLIDER AND GRID */}
          <Section1
            carouselData={mainCarouselData?.data}
            topBanners={topBanners?.data}
          />

          {/* SERVICE CARDS */}
          <AnimatedCategoryList categories={categories?.data} />

          {/* DEALS OF THE DAY AND OFFER BANNERS */}
          {products?.data?.length > 4 && <Section4 products={products?.data} />}
          {topCategories?.data?.map((category, index) => (
            <SelectedProducts
              key={category?.id}
              category={category}
              banner={
                index % 2 === 0
                  ? fullBanners?.data?.pop()
                  : [...halfBanners?.data]
              }
            />
          ))}
          <MobileBannerSection topBanners={topBanners?.data} />
          {/* TOP OFFER BANNERS */}
          {threeBanners?.data.length > 2 && (
            <ThreeBanner data={threeBanners?.data.slice(0, 3)} />
          )}
          <AllProducts />
          {/* SELECTED PRODUCTS */}
        </Box>

        {/* POPUP NEWSLETTER FORM */}
        {/* <Newsletter /> */}

        {/* SETTINGS IS USED ONLY FOR DEMO, YOU CAN REMOVE THIS */}
        {/* <Setting /> */}
      </Fragment>
    );
  } catch (error) {
    console.error(error);
    notFound();
  }
};

export default MarketTwoPageView;
