"use client";

import Grid from "@mui/material/Grid";
// LOCAL CUSTOM COMPONENTS
import CartItemCard from "../cart-item";
import CheckoutForm from "../checkout-form";
import useCartService from "hooks/useCartService";
import { useEffect } from "react";

const CartPageView = () => {
  const { cart, handleFetch } = useCartService();
  const { cartItems } = cart;

  useEffect(() => {
    handleFetch();
  }, [handleFetch]);

  return (
    <Grid container spacing={3}>
      {/* CART PRODUCT LIST */}
      <Grid item md={8} xs={12}>
        {cartItems?.map((item) => (
          <CartItemCard key={item.productId} {...item} />
        ))}
      </Grid>
      {/* CHECKOUT FORM */}
      <Grid item md={4} xs={12}>
        <CheckoutForm />
      </Grid>
    </Grid>
  );
};

export default CartPageView;
