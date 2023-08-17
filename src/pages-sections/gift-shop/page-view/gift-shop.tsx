import { Fragment } from "react";
import Box from "@mui/material/Box";
// GLOBAL CUSTOM COMPONENTS
import Setting from "components/Setting";
import Newsletter from "components/Newsletter";
import SideNavbar from "components/page-sidenav/SideNavbar";
import { MobileNavigationBar2 } from "components/mobile-navigation";
// Local CUSTOM COMPONENTS
import Sidebar from "../sidebar";
import Section1 from "../section-1";
import Section2 from "../section-2";
import Section3 from "../section-3";
import Section4 from "../section-4";
import Section5 from "../section-5";
import Section6 from "../section-6";
import Section7 from "../section-7";
// API FUNCTIONS
import api from "utils/__api__/gift-shop";

const GiftShopPageView = async () => {
  const allProducts = await api.getAllProducts();
  const serviceList = await api.getServiceList();
  const topCategories = await api.getTopCategories();
  const carouselData = await api.getMainCarouselData();
  const popularProducts = await api.getPopularProducts();
  const topSailedProducts = await api.getTopSailedProducts();
  const categoryNavigation = await api.getCategoryNavigation();

  return (
    <Fragment>
      {/* TOP HERO AREA */}
      <Section1 carouselData={carouselData} />

      {/* SIDEBAR WITH CONTENT */}
      <Sidebar navList={categoryNavigation}>
        {/* SERVICE LIST AREA */}
        <Section2 serviceList={serviceList} />

        {/* OFFER BANNER AREA */}
        <Section3 />

        {/* TOP CATEGORY AREA */}
        <Box mb={6} mt={4} className="categories">
          <Section4 categoryList={topCategories} />
        </Box>
      </Sidebar>

      {/* POPULAR PRODUCT AREA */}
      <Section5 products={popularProducts} />

      {/* TOP SALES PRODUCTS AREA */}
      <Section6 products={topSailedProducts} />

      {/* ALL PRODUCTS AREA */}
      <Section7 products={allProducts} />

      {/* SETTINGS IS USED ONLY FOR DEMO, YOU CAN REMOVE THIS */}
      <Setting />

      {/* POPUP NEWSLETTER FORM */}
      <Newsletter image="/assets/images/newsletter/bg-5.png" />

      {/* MOBILE NAVIGATION WITH SIDE NAVBAR */}
      <MobileNavigationBar2>
        <SideNavbar navList={categoryNavigation} lineStyle="dash" sidebarStyle="style2" />
      </MobileNavigationBar2>
    </Fragment>
  );
};

export default GiftShopPageView;
