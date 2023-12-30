import { Fragment } from "react";
import Box from "@mui/material/Box";
//GLOBAL CUSTOM COMPONENTS
import { Setting } from "components/settings";
import { Newsletter } from "components/newsletter";
//LOCAL CUSTOM COMPONENTS
import Offers from "../offers";
import Section1 from "../section-1";
import Section2 from "../section-2";
import Section3 from "../section-3";
import Section4 from "../section-4";
import Section5 from "../section-5";
import Section6 from "../section-6";
import Section7 from "../section-7";
import Section8 from "../section-8";
import Section9 from "../section-9";
// API FUNCTIONS
import api from "utils/__api__/market-2";
import { getServerSession } from "next-auth";
import request from "utils/request";
import API from "constants/products";

const MarketTwoPageView = async () => {
  const products = await request(API.GET_PRODUCTS, { query: "limit=5" });
  const brands = await api.getBrands();
  const categories = await request(API.GET_CATEGORIES, { query: "limit=5&categoryType=PRODUCT" });
  // const products = await api.getProducts();
  const serviceList = await api.getServices();
  const categories2 = await api.getCategories();
  const mainCarouselData = await api.getMainCarouselData();
  const menFashionProducts = await api.getMenFashionProducts();
  const electronicsProducts = await api.getElectronicsProducts();
  const womenFashionProducts = await api.getWomenFashionProducts();

  //console.log(categories2);
  //console.log(electronicsProducts);
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
        {categories?.data.map(async (category, index) => {
          const children = await request(API.GET_CATEGORIES, {
            query: `limit=8&categoryType=PRODUCT&parentCategoryId=${category.id}`,
          });
          const categoryList = { id: category.id, title: category.name, children: children?.data };
          return index % 2 == 0 ? (
            <>
              <Section5 data={{ category: categoryList }} key={category.id} />
              <Section7 />
            </>
          ) : (
            <Section5 data={{ category: categoryList }} key={category.id} />
          );
        })}
        {/* PRODUCT ROW WITH ELECTRONICS CATEGORY LIST */}

        {/* OFFER BANNER */}
        <Section6 />

        {/* PRODUCT ROW WITH MEN'S FASHION CATEGORY LIST */}
        <Section5 data={menFashionProducts} />

        {/* OFFER BANNER */}
        <Section7 />

        {/* PRODUCT ROW WITH WOMEN'S FASHION CATEGORY LIST */}
        <Section5 data={womenFashionProducts} />

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
