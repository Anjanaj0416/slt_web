"use client";

import { Fragment } from "react";
import format from "date-fns/format";
import { ShoppingBag } from "@mui/icons-material";
import { Avatar, Box, Button, Card } from "@mui/material";
// GLOBAL CUSTOM COMPONENTS
import { H6, Paragraph } from "components/Typography";
import { FlexBetween, FlexBox } from "components/flex-box";
import { Navigation } from "components/layouts/customer-dashboard-layout";
// Local CUSTOM COMPONENTS
import OrderSummery from "../order-summery";
import OrderProgress from "../order-progress";
import DashboardHeader from "../../dashboard-header";
// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";
// CUSTOM DATA MODEL
import Order from "models/Order.model";

// =============================================================
type Props = { order: Order };
// =============================================================

const OrderDetailsPageView = ({ order }: Props) => {
  // SECTION TITLE HEADER
  const HEADER_BUTTON = (
    <Button color="primary" sx={{ bgcolor: "primary.light", px: 4 }}>
      Order Again
    </Button>
  );

  return (
    <Fragment>
      {/* TITLE HEADER AREA */}
      <DashboardHeader
        Icon={ShoppingBag}
        title="Order Details"
        button={HEADER_BUTTON}
        navigation={<Navigation />}
      />

      {/* ORDER PROGRESS AREA */}
      <OrderProgress />

      {/* ORDERED PRODUCT LIST */}
      <Card sx={{ p: 0, mb: "30px" }}>
        <FlexBetween px={3} py={2} flexWrap="wrap" bgcolor="grey.200">
          <FlexBox gap={1} alignItems="center">
            <Paragraph color="grey.600">Order ID:</Paragraph>
            <Paragraph>{order.id}</Paragraph>
          </FlexBox>

          <FlexBox gap={1} alignItems="center">
            <Paragraph color="grey.600">Placed on:</Paragraph>
            <Paragraph>{format(new Date(order.createdAt), "dd MMM, yyyy")}</Paragraph>
          </FlexBox>

          <FlexBox gap={1} alignItems="center">
            <Paragraph color="grey.600">Delivered on:</Paragraph>
            <Paragraph>{format(new Date(), "dd MMM, yyyy")}</Paragraph>
          </FlexBox>
        </FlexBetween>

        {order.items.map((item, ind) => (
          <FlexBetween px={2} py={1} flexWrap="wrap" key={ind}>
            <FlexBox gap={2.5} alignItems="center">
              <Avatar src={item.product_img} sx={{ height: 64, width: 64 }} />

              <Box>
                <H6 my="0px">{item.product_name}</H6>
                <Paragraph color="grey.600">
                  {currency(item.product_price)} x {item.product_quantity}
                </Paragraph>
              </Box>
            </FlexBox>

            <Paragraph color="grey.600" ellipsis>
              Product properties: Black, L
            </Paragraph>

            <Button variant="text" color="primary">
              Write a Review
            </Button>
          </FlexBetween>
        ))}
      </Card>

      {/* SHIPPING AND ORDER SUMMERY */}
      <OrderSummery order={order} />
    </Fragment>
  );
};

export default OrderDetailsPageView;
