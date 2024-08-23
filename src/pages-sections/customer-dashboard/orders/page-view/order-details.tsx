"use client";

import { Fragment } from "react";
import ShoppingBag from "@mui/icons-material/ShoppingBag";
// Local CUSTOM COMPONENTS
import OrderSummery from "../order-summery";
import OrderProgress from "../order-progress";
import OrderedProducts from "../ordered-products";
import DashboardHeader from "../../dashboard-header";
// CUSTOM DATA MODEL
import { Order1 } from "models/Order.model";

// =============================================================
type Props = { order: Order1 };
// =============================================================

const OrderDetailsPageView = ({ order }: Props) => {
  console.log(order.status);

  return (
    <Fragment>
      {/* TITLE HEADER AREA */}
      <DashboardHeader
        href="/orders"
        Icon={ShoppingBag}
        title={
          order.status === "SUCCESS"
            ? "Order Details"
            : "Order Details - Pending Payment"
        }
        buttonText={order.status === "SUCCESS" ? "Order Again" : "Pay Now"}
      />

      {/* ORDER PROGRESS AREA */}
      {order.status === "SUCCESS" &&
        order.packages.length === 1 &&
        order.packages[0].status !== "CANCELLED" && (
          <OrderProgress status={order.packages[0].status} />
        )}

      {/* ORDERED PRODUCT LIST */}
      <OrderedProducts order={order} />

      {/* SHIPPING AND ORDER SUMMERY */}
      <OrderSummery order={order} />
    </Fragment>
  );
};

export default OrderDetailsPageView;
