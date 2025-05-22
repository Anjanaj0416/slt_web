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
import { Box, CircularProgress } from "@mui/material";

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
        filteredOrders?.length > 0 ? (
          filteredOrders?.map((order) => (
            <OrderRow order={order} key={order.id} />
          ))
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "200px",
              fontWeight: "semibold",
              fontSize: "18px",
            }}
          >
            There is no orders !
          </Box>
        )
      ) : (
        <CircularProgress />
      )}

      {/* ORDERS PAGINATION */}
      {filteredOrders?.length > 0 && (
        <Pagination
          count={totalPage || initTotalPages}
          onChange={handleTablePagination}
        />
      )}
    </Fragment>
  );
};

export default OrdersPageView;
