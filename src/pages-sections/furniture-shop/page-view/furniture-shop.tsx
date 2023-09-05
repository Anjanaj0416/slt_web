import { Fragment } from "react";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
// GLOBAL CUSTOM COMPONENTS
import { Setting } from "components/settings";
import { Newsletter } from "components/newsletter";
// LOCAL CUSTOM COMPONENTS
import Sidebar from "../sidebar";
import Section1 from "../section-1";
import Section3 from "../section-3";
import Section4 from "../section-4";
// API FUNCTIONS
import api from "utils/__api__/furniture-shop";

const FurnitureShopPageView = async () => {
  const topNewProducts = await api.getTopNewProducts();
  const mainCarouselData = await api.getMainCarouselData();
  const furnitureProducts = await api.getFurnitureProducts();
  const sidebarNavList = await api.getFurnitureShopNavList();
  const topSellingProducts = await api.getTopSellingProducts();

  return (
    <Fragment>
      {/* HERO SECTION */}
      <Section1 mainCarouselData={mainCarouselData} />

      <Container>
        {/* LEFT SIDEBAR & OFFER BANNERS AREA */}
        <Sidebar navList={sidebarNavList} />

        <Stack spacing={6} my={6}>
          {/* TOP NEW PRODUCTS AREA */}
          <Section3
            heading="Top New Product"
            products={topNewProducts}
            description="Tall blind but were, been folks not the expand"
          />

          {/* TOP SELLING PRODUCT AREA */}
          <Section3
            heading="Top Selling Product"
            products={topSellingProducts}
            description="Tall blind but were, been folks not the expand"
          />

          {/* ALL PRODUCTS AREA */}
          <Section4 products={furnitureProducts} />
        </Stack>
      </Container>

      {/* POPUP NEWSLETTER FORM */}
      <Newsletter image="/assets/images/newsletter/bg-3.png" />

      {/* SETTINGS IS USED ONLY FOR DEMO, YOU CAN REMOVE THIS */}
      <Setting />
    </Fragment>
  );
};

export default FurnitureShopPageView;
