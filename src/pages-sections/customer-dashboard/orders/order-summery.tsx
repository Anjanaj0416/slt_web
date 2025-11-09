import { FC } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
// GLOBAL CUSTOM COMPONENTS
import { FlexBetween } from "components/flex-box";
import { H5, H6, Paragraph } from "components/Typography";
// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";
// CUSTOM DATA MODEL
import { Order1 } from "models/Order.model";
import calculateOrderPriceSummary from "./utils/calculate-order-total-price";

// ==============================================================
type Props = { order: Order1 };
// ==============================================================

function ListItem({ title, value }: { title: string; value: string }) {
  return (
    <FlexBetween mb={1}>
      <Paragraph color="grey.600">{title}</Paragraph>
      <H6>{value}</H6>
    </FlexBetween>
  );
}

const OrderSummery: FC<Props> = ({ order }) => {
  const { totalDiscount, totalPrice, totalShippingCost, subTotal } =
    calculateOrderPriceSummary(order);
  return (
    <Grid container spacing={3}>
      {/* SHIPMENT ADDRESS SECTION */}
      <Grid item lg={6} md={6} xs={12}>
        <Card sx={{ p: 3 }}>
          <H5 mt={0} mb={2}>
            Shipping Address
          </H5>
          <Paragraph fontSize={14} my={0} textTransform="capitalize">
            {order.shippingAddress?.name ?? ""}
          </Paragraph>
          <Paragraph fontSize={14} my={0}>
            {order.shippingAddress?.contactNumber ?? ""}
          </Paragraph>
          <Paragraph fontSize={14} my={0}>
            {order.shippingAddress?.postalCode ?? ""}
          </Paragraph>
          <Paragraph fontSize={14} my={0} textTransform="capitalize">
            {`${order.shippingAddress?.addressLine1 ?? ""} 
            ${order.shippingAddress?.addressLine2 ?? ""}`}
          </Paragraph>
          <Paragraph fontSize={14} my={0} textTransform="capitalize">
            {`${order.shippingAddress?.country ?? ""}`}
          </Paragraph>
        </Card>
      </Grid>

      {/* TOTAL SUMMERY SECTION */}
      <Grid item lg={6} md={6} xs={12}>
        <Card sx={{ p: 3 }}>
          <H5 mt={0} mb={2}>
            Total Summary
          </H5>

          <ListItem title="Subtotal:" value={currency(subTotal)} />
          <ListItem title="Shipping fee:" value={currency(totalShippingCost)} />
          <ListItem title="Discount:" value={currency(totalDiscount)} />

          <Divider sx={{ mb: 1 }} />

          <FlexBetween mb={2}>
            <H6>Total</H6>
            <H6>{currency(totalPrice)}</H6>
          </FlexBetween>

          <Paragraph>{`Paid by ${
            order.payments.some((e) => e.paymentType === "COD")
              ? "Cash On Delivery"
              : "Credit/Debit Card"
          }`}</Paragraph>
        </Card>
      </Grid>
    </Grid>
  );
};

export default OrderSummery;
