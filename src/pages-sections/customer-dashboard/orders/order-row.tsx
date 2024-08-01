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
import calculateOrderTotalAmount from "./utils/calculate-order-total-price";

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
      case "SHIPPED":
        return "warning";
      case "DELIVERED":
        return "success";
      case "CANCELLED":
        return "primary";
      default:
        return "default";
    }
  };

  const getOrderStatus = () => {
    if (packages.some((e) => e.status === "PENDING")) {
      return "PENDING";
    } else if (packages.some((e) => e.status === "PROCESSING")) {
      return "PROCESSING";
    } else if (packages.some((e) => e.status === "SHIPPED")) {
      return "SHIPPED";
    } else if (packages.some((e) => e.status === "DELIVERED")) {
      return "DELIVERED";
    } else {
      return "CANCELLED";
    }
  };

  const orderStatus = getOrderStatus();

  return (
    <Link href={`/orders/${order.id}`}>
      <TableRow sx={{ gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr" }}>
        <H5 ellipsis>#{order.id.substring(0, 18)}</H5>

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
          {currency(calculateOrderTotalAmount(order.packages))}
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
