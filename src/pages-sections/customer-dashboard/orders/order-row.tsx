import East from "@mui/icons-material/East";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import format from "date-fns/format";
import Link from "next/link";
import { FC } from "react";
// GLOBAL CUSTOM COMPONENT
import { H5, Paragraph } from "components/Typography";
// Local CUSTOM COMPONENT
import TableRow from "../table-row";
// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";
// CUSTOM DATA MODEL
import { Order1 } from "models/Order.model";
import calculateOrderPriceSummary from "./utils/calculate-order-total-price";

// =================================================
type Props = { order: Order1 };
// =================================================

const OrderRow: FC<Props> = ({ order }) => {
  const { packages } = order;

  const getColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "secondary";
      case "PROCESSING":
        return "info";
      case "READY TO DISPATCH":
      case "SHIPPED":
        return "warning";
      case "DELIVERED":
        return "success";
      case "ORDER FAILED":
      case "CANCELLED":
      case "RETURNED":
      case "PENDING PAYMENT":
        return "primary";
      default:
        return "default";
    }
  };

  const getOrderStatus = () => {
    if (order.status === "PENDING") {
      return "PENDING PAYMENT";
    } else if (order.status === "FAILED") {
      return "ORDER FAILED";
    }
    if (packages.some((e) => e.status === "PENDING")) {
      return "PENDING";
    } else if (packages.some((e) => e.status === "PROCESSING")) {
      return "PROCESSING";
    } else if (packages.some((e) => e.status === "PICKUP_REQUESTED")) {
      return "READY TO DISPATCH";
    } else if (packages.some((e) => e.status === "SHIPPED")) {
      return "SHIPPED";
    } else if (packages.some((e) => e.status === "DELIVERED")) {
      return "DELIVERED";
    } else if (packages.some((e) => e.status === "CANCELLED")) {
      return "CANCELLED";
    } else if (packages.some((e) => e.status === "RETURNED")) {
      return "RETURNED";
    }
    return "PROCESSING";
  };

  const orderStatus = getOrderStatus();

  return (
    <Link href={`/orders/${order.id}_${order.orderNumber}`}>
      <TableRow sx={{ gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr" }}>
        <H5 ellipsis>{String(order?.orderNumber)?.padStart(8, "0")}</H5>

        <Box textAlign="center">
          <Chip
            size="small"
            label={orderStatus}
            color={getColor(orderStatus)}
          />
        </Box>

        <Paragraph textAlign={{ sm: "center", xs: "left" }}>
          {format(new Date(order.createdAt), "MMM dd, yyyy")}
        </Paragraph>

        <Paragraph textAlign="right">
          {currency(calculateOrderPriceSummary(order).totalPrice)}
        </Paragraph>

        <Box display={{ sm: "inline-flex", xs: "none" }} justifyContent="end">
          <IconButton>
            <East
              fontSize="small"
              sx={{
                color: "grey.500",
                transform: ({ direction }) =>
                  `rotate(${direction === "rtl" ? "180deg" : "0deg"})`,
              }}
            />
          </IconButton>
        </Box>
      </TableRow>
    </Link>
  );
};

export default OrderRow;
