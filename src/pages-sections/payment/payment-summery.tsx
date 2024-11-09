import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
// LOCAL CUSTOM COMPONENT
import PaymentItem from "./payment-item";
// GLOBAL CUSTOM COMPONENTS
import { Paragraph } from "components/Typography";
// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";
import useCartService from "hooks/useCartService";

const PaymentSummary = () => {
  const { totalPrice, totalDiscount } = useCartService();
  return (
    <Card sx={{ padding: { sm: 3, xs: 2 } }}>
      <PaymentItem title="Subtotal:" amount={totalPrice} />
      <PaymentItem title="Shipping:" />
      {/* <PaymentItem title="Tax:" /> */}
      <PaymentItem title="Discount:" amount={totalDiscount} />

      <Divider sx={{ my: 2 }} />

      <Paragraph
        fontSize={25}
        fontWeight={600}
        lineHeight={1}
        textAlign="right"
      >
        {currency(totalPrice - totalDiscount)}
      </Paragraph>
    </Card>
  );
};

export default PaymentSummary;
