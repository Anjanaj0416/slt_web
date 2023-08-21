"use client";

import { Fragment } from "react";
import Pagination from "@mui/material/Pagination";
import ShoppingBag from "@mui/icons-material/ShoppingBag";
import TableRow from "components/TableRow";
import { H5 } from "components/Typography";
import { FlexBox } from "components/flex-box";

import OrderRow from "pages-sections/orders/OrderRow";

import Order from "models/Order.model";

import DashboardHeader from "../../dashboard-header";
import { Navigation } from "components/layouts/customer-dashboard-layout";

// ====================================================
type Props = { orders: Order[] };
// ====================================================

const OrdersPageView = ({ orders }: Props) => {
  const COLUMNS = ["Order No", "Status", "Date Purchased", "Total"];

  return (
    <Fragment>
      {/* TITLE HEADER AREA */}
      <DashboardHeader Icon={ShoppingBag} title="My Orders" navigation={<Navigation />} />

      {/* ORDER LIST AREA */}
      <TableRow
        elevation={0}
        sx={{ padding: "0px 18px", background: "none", display: { xs: "none", md: "flex" } }}
      >
        {COLUMNS.map((col) => (
          <H5 color="grey.600" my={0} mx={0.75} key={col}>
            {col}
          </H5>
        ))}

        <H5
          my={0}
          px={2.75}
          color="grey.600"
          flex="0 0 0 !important"
          display={{ xs: "none", md: "block" }}
        />
      </TableRow>

      {/* ORDERS ROWS */}
      {orders.map((order) => (
        <OrderRow order={order} key={order.id} />
      ))}

      {/* ORDERS PAGINATION */}
      <FlexBox justifyContent="center" mt={5}>
        <Pagination
          count={5}
          color="primary"
          variant="outlined"
          onChange={(data) => console.log(data)}
        />
      </FlexBox>
    </Fragment>
  );
};

export default OrdersPageView;
