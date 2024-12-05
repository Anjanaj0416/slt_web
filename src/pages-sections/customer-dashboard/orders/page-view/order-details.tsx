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
import useBuyNowItemService from "hooks/useBuyNowItemService";

// =============================================================
type Props = { order: Order1 };
// =============================================================

const OrderDetailsPageView = ({ order }: Props) => {
  const { handleAddToItem } = useBuyNowItemService();
  const handleReOrder = () => {
    const items = [];
    order.packages.forEach((pkg) => {
      pkg.packageItems.forEach((pkgItem) => {
        const {
          productVariant,
          units,
          price,
          productId,
          productName,
          images,
          basePrice,
          brand,
          productDiscountAmount,
          productDiscountType,
        } = pkgItem;
        const product = {
          id: productId,
          images,
          basePrice,
          brand,
          price,
          discountType: productDiscountType,
          discountAmount: productDiscountAmount,
          name: productName,
        };
        items.push({ product, productVariant, units });
      });
    });
    handleAddToItem(items);
  };
  return (
    <Fragment>
      {/* TITLE HEADER AREA */}
      <DashboardHeader
        onClick={handleReOrder}
        Icon={ShoppingBag}
        title={
          order.status === "SUCCESS"
            ? "Order Details"
            : "Order Details - Pending Payment"
        }
        buttonText="Order Again"
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
