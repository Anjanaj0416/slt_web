"use client";

import Grid from "@mui/material/Grid";
// LOCAL CUSTOM COMPONENTS
import { CheckoutSummary } from "../checkout-summery";
import { CheckoutForm } from "pages-sections/checkout/checkout-alt-form";

const BuyNowCheckoutPageView = ({ address }) => {
  return (
    <Grid container flexWrap="wrap-reverse" spacing={3}>
      <Grid item lg={8} md={8} xs={12}>
        <CheckoutForm address={address} type="BUY_NOW" />
      </Grid>

      <Grid item lg={4} md={4} xs={12}>
        <CheckoutSummary />
      </Grid>
    </Grid>
  );
};

export default BuyNowCheckoutPageView;
