"use client";

import { Fragment } from "react";
import Container from "@mui/material/Container";
// GLOBAL CUSTOM COMPONENTS
import Setting from "components/Setting";
import Newsletter from "components/Newsletter";
import { MobileNavigationBar } from "components/mobile-navigation";
// Local CUSTOM COMPONENTS
import Section1 from "../section-1";
import Section2 from "../section-2";
import Section3 from "../section-3";
import Section4 from "../section-4";

import api from "utils/__api__/grocery3-shop";
// CUSTOM DATA MODELS
import Product from "models/Product.model";
import { MainCarouselItem, OfferCard } from "models/Grocery-3.model";

// ======================================================
interface Props {
  allProducts: Product[];
  offerCards: OfferCard[];
  topSailedProducts: Product[];
  mainCarouselData: MainCarouselItem[];
}
// ======================================================

const GroceryThreePageView = (props: Props) => {
  return (
    <Fragment>
      {/* TOP HERO CAROUSEL AREA */}
      <Section1 mainCarouselData={props.mainCarouselData} />

      <Container sx={{ mb: 6 }}>
        {/* DISCOUNT OFFERS AREA */}
        <Section2 offers={props.offerCards} />

        {/* TOP SALES PRODUCTS AREA */}
        <Section3 products={props.topSailedProducts} />

        {/* OUR ALL PRODUCTS AREA */}
        <Section4 products={props.allProducts} />
      </Container>

      {/* POPUP NEWSLETTER FORM */}
      <Newsletter image="/assets/images/newsletter/bg-2.png" />

      {/* SETTINGS IS USED ONLY FOR DEMO, YOU CAN REMOVE THIS */}
      <Setting />

      {/* SMALL DEVICE BOTTOM NAVIGATION */}
      <MobileNavigationBar />
    </Fragment>
  );
};

export default GroceryThreePageView;
