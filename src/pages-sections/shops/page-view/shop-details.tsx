"use client";

import { Container, Grid, IconButton, useMediaQuery, Theme } from "@mui/material";
import FilterList from "@mui/icons-material/FilterList";
// GLOBAL CUSTOM COMPONENTS
import Sidenav from "components/Sidenav";
import ProductList1 from "components/products/ProductList1";
// Local CUSTOM COMPONENTS
import ShopIntroCard from "../shop-intro-card";
import ProductFilterCard from "../../product-details/product-filter-card";
// CUSTOM DATA MODEL
import Shop from "models/Shop.model";

// ============================================================
type Props = { shop: Shop };
// ============================================================

const ShopDetailsPageView = ({ shop }: Props) => {
  const isDownMd = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

  const ICON_BUTTON = (
    <IconButton sx={{ float: "right" }}>
      <FilterList fontSize="small" />
    </IconButton>
  );

  return (
    <Container sx={{ mt: 4, mb: 6 }}>
      {/* SHOP INTRODUCTION AREA */}
      <ShopIntroCard
        name={shop.name}
        phone={shop.phone}
        address={shop.address}
        coverPicture={shop.coverPicture}
        profilePicture={shop.profilePicture}
      />

      <Grid container spacing={3}>
        {/* SIDEBAR AREA */}
        <Grid item md={3} xs={12} sx={{ display: { md: "block", xs: "none" } }}>
          <ProductFilterCard />
        </Grid>

        <Grid item md={9} xs={12}>
          {/* SMALL DEVICE SIDEBAR AREA */}
          {isDownMd && (
            <Sidenav position="left" handle={ICON_BUTTON}>
              <ProductFilterCard />
            </Sidenav>
          )}

          {/* PRODUCT LIST AREA */}
          <ProductList1 products={shop.products.slice(0, 9)} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ShopDetailsPageView;
