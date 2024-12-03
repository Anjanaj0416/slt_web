"use client";

import Grid from "@mui/material/Grid";
// LOCAL CUSTOM COMPONENTS
import CartItemCard from "../buying-item";
import CheckoutForm from "../checkout-form";
import useBuyNowItemService from "hooks/useBuyNowItemService";

const BuyingItemsPageView = () => {
  const { items } = useBuyNowItemService();

  return (
    <Grid container spacing={3}>
      {/* CART PRODUCT LIST */}
      <Grid item md={8} xs={12}>
        {items?.map((item) => <CartItemCard key={item.productId} {...item} />)}
      </Grid>
      {/* CHECKOUT FORM */}
      <Grid item md={4} xs={12}>
        <CheckoutForm />
      </Grid>
    </Grid>
  );
};

export default BuyingItemsPageView;
