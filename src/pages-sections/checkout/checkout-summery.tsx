import { Button, Card, Divider, Stack, TextField, Typography } from "@mui/material";
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

      <Typography fontSize={25} fontWeight={600} lineHeight={1} textAlign="right">
        {currency(2610)}
      </Typography>

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
      <Typography color="grey.600">{title}</Typography>
      <Typography fontSize={18} fontWeight={600} lineHeight={1}>
        {currency(amount)}
      </Typography>
    </FlexBetween>
  );
}

export default CheckoutSummary;
