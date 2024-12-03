"use client";

import Grid from "@mui/material/Grid";
// Local CUSTOM COMPONENTS
import PaymentForm from "../payment-form";
import PaymentSummary from "../payment-summery";
import { useEffect } from "react";
import useCheckoutService from "hooks/useCheckoutService";
import { useRouter } from "next/navigation";
import { Box, CircularProgress } from "@mui/material";

type Props = {
  type: "CART" | "BUY_NOW";
};
const PaymentPageView = ({ type }: Props) => {
  const { push } = useRouter();
  const { selectedBillingAddressId, selectedShippingAddressId } =
    useCheckoutService();
  const canPayment = selectedBillingAddressId || selectedShippingAddressId;

  useEffect(() => {
    if (!canPayment) {
      push(type === "CART" ? "/checkout" : "/buy-now/checkout");
    }
  }, [canPayment]);

  return (
    <Grid container flexWrap="wrap-reverse" spacing={3} minHeight="274px">
      {canPayment ? (
        <>
          <Grid item lg={8} md={8} xs={12}>
            <PaymentForm type={type} />
          </Grid>
          <Grid item lg={4} md={4} xs={12}>
            <PaymentSummary type={type} />
          </Grid>
        </>
      ) : (
        <Box
          display="flex"
          justifyItems="center"
          justifyContent="center"
          alignItems="center"
          height="274px"
          width="100%"
        >
          <CircularProgress />
        </Box>
      )}
    </Grid>
  );
};

export default PaymentPageView;
