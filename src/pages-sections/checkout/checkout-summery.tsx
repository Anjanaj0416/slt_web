import { Button, Card, Divider, Stack, TextField } from "@mui/material";
import { Paragraph } from "components/Typography";
// GLOBAL CUSTOM COMPONENTS
import { FlexBetween } from "components/flex-box";
// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";

const CheckoutSummary = () => {
  return (
    <Card sx={{ p: 3 }}>
      <SummeryItem title="Subtotal:" amount={2610} />
      <SummeryItem title="Shipping:" amount={0} />
      <SummeryItem title="Tax:" amount={40} />
      <SummeryItem title="Discount:" amount={0} />

      <Divider sx={{ my: 2 }} />

      <Paragraph fontSize={25} fontWeight={600} lineHeight={1}>
        {currency(2610)}
      </Paragraph>

      <Stack spacing={2} mt={3}>
        <TextField placeholder="Voucher" variant="outlined" size="small" fullWidth />
        <Button variant="outlined" color="primary" fullWidth sx={{ mt: 2 }}>
          Apply Voucher
        </Button>
      </Stack>
    </Card>
  );
};

function SummeryItem({ title, amount }: { title: string; amount: number }) {
  return (
    <FlexBetween mb={1}>
      <Paragraph color="grey.600">{title}</Paragraph>
      <Paragraph fontSize={18} fontWeight={600} lineHeight={1}>
        {currency(amount)}
      </Paragraph>
    </FlexBetween>
  );
}

export default CheckoutSummary;
