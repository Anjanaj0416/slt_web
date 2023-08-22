import { FC } from "react";
import Link from "next/link";
import format from "date-fns/format";
import East from "@mui/icons-material/East";
import { Box, Chip, IconButton } from "@mui/material";
// GLOBAL CUSTOM COMPONENT
import { H5, Paragraph } from "components/Typography";
// Local CUSTOM COMPONENT
import TableRow from "../table-row";
// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";
// CUSTOM DATA MODEL
import Order from "models/Order.model";

// =================================================
type OrderRowProps = { order: Order };
// =================================================

const OrderRow: FC<OrderRowProps> = ({ order }) => {
  const getColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "secondary";

      case "Processing":
        return "secondary";

      case "Delivered":
        return "success";

      case "Cancelled":
        return "primary";

      default:
        return "default";
    }
  };

  return (
    <Link href={`/orders/${order.id}`}>
      <TableRow sx={{ gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr" }}>
        <H5 ellipsis>#{order.id.substring(0, 18)}</H5>

        <Box textAlign="center">
          <Chip size="small" label={order.status} color={getColor(order.status)} />
        </Box>

        <Paragraph textAlign={{ sm: "center", xs: "left" }}>
          {format(new Date(order.createdAt), "MMM dd, yyyy")}
        </Paragraph>

        <Paragraph textAlign="center">{currency(order.totalPrice)}</Paragraph>

        <Box display={{ sm: "inline-flex", xs: "none" }} justifyContent="end">
          <IconButton>
            <East
              fontSize="small"
              sx={{
                color: "grey.500",
                transform: ({ direction }) => `rotate(${direction === "rtl" ? "180deg" : "0deg"})`,
              }}
            />
          </IconButton>
        </Box>
      </TableRow>
    </Link>
  );
};

export default OrderRow;
