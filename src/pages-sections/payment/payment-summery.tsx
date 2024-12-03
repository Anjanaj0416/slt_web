import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
// LOCAL CUSTOM COMPONENT
import PaymentItem from "./payment-item";
// GLOBAL CUSTOM COMPONENTS
import { Paragraph } from "components/Typography";
// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";
import useCartService from "hooks/useCartService";
import useBuyNowItemService from "hooks/useBuyNowItemService";

type Props = {
  type: "CART" | "BUY_NOW";
};
const PaymentSummary = ({ type }: Props) => {
  const { totalPrice, totalDiscount } = useCartService();
  const { totalPrice: buyingTotal, totalDiscount: buyingDiscount } =
    useBuyNowItemService();
  return (
    <Card sx={{ padding: { sm: 3, xs: 2 } }}>
      <PaymentItem
        title="Subtotal:"
        amount={type === "CART" ? totalPrice : buyingTotal}
      />
      <PaymentItem title="Shipping:" />
      {/* <PaymentItem title="Tax:" /> */}
      <PaymentItem
        title="Discount:"
        amount={type === "CART" ? totalDiscount : buyingDiscount}
      />

      <Divider sx={{ my: 2 }} />

      <Paragraph
        fontSize={25}
        fontWeight={600}
        lineHeight={1}
        textAlign="right"
      >
        {type === "CART"
          ? currency(totalPrice - totalDiscount)
          : currency(buyingTotal - buyingDiscount)}
      </Paragraph>
    </Card>
  );
};

export default PaymentSummary;
