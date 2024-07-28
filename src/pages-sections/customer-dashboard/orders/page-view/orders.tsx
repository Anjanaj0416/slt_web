"use client";

import { Fragment } from "react";
import ShoppingBag from "@mui/icons-material/ShoppingBag";
// Local CUSTOM COMPONENTS
import OrderRow from "../order-row";
import Pagination from "../../pagination";
import DashboardHeader from "../../dashboard-header";
// CUSTOM DATA MODEL
import { Order1 } from "models/Order.model";
import useListOrders from "../hooks/use-list-orders";
import { CircularProgress } from "@mui/material";

// ====================================================
type Props = { orders: Order1[]; initTotalPages: number };
// ====================================================

const OrdersPageView = ({ orders, initTotalPages }: Props) => {
  const { isLoading, filteredOrders, handleTablePagination, totalPage } =
    useListOrders(orders);

  return (
    <Fragment>
      {/* TITLE HEADER AREA */}
      <DashboardHeader Icon={ShoppingBag} title="My Orders" />

      {/* ORDER LIST AREA */}
      {!isLoading ? (
        filteredOrders?.map((order) => (
          <OrderRow order={order} key={order.id} />
        ))
      ) : (
        <CircularProgress />
      )}

      {/* ORDERS PAGINATION */}
      <Pagination
        count={totalPage || initTotalPages}
        onChange={handleTablePagination}
      />
    </Fragment>
  );
};

export default OrdersPageView;
