import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
// GLOBAL CUSTOM COMPONENTS
import { FlexBetween } from "components/flex-box";
import { Paragraph } from "components/Typography";
// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";

const PaymentSummary = () => {
  return (
    <Card sx={{ padding: { sm: 3, xs: 2 } }}>
      <PaymentItem title="Subtotal:" amount={2610} />
      <PaymentItem title="Shipping:" />
      <PaymentItem title="Tax:" amount={40} />
      <PaymentItem title="Discount:" amount={40} />

      <Divider sx={{ my: 2 }} />

      <Paragraph fontSize={25} fontWeight={600} lineHeight={1} textAlign="right">
        {currency(2650)}
      </Paragraph>
    </Card>
  );
};

function PaymentItem({ title, amount }: { title: string; amount?: number }) {
  return (
    <FlexBetween mb={1}>
      <Paragraph color="grey.600">{title}</Paragraph>
      <Paragraph fontSize={18} fontWeight={600} lineHeight={1}>
        {amount ? currency(amount) : "-"}
      </Paragraph>
    </FlexBetween>
  );
}

export default PaymentSummary;
