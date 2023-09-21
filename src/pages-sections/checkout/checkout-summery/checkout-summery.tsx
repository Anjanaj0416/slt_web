import { Button, Card, Divider, Stack, TextField } from "@mui/material";
// GLOBAL CUSTOM COMPONENTS
import { Paragraph } from "components/Typography";
// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";
import ListItem from "../list-item";

const CheckoutSummary = () => {
  return (
    <Card sx={{ p: 3 }}>
      <ListItem mb={1} title="Subtotal" value={2610} />
      <ListItem mb={1} title="Shipping" />
      <ListItem mb={1} title="Tax" value={40} />
      <ListItem mb={1} title="Discount" />

      <Divider sx={{ my: 2 }} />

      <Paragraph fontSize={25} fontWeight={600} lineHeight={1}>
        {currency(2610)}
      </Paragraph>

      <Stack spacing={2} mt={3}>
        <TextField placeholder="Voucher" variant="outlined" size="small" fullWidth />
        <Button variant="outlined" color="primary" fullWidth>
          Apply Voucher
        </Button>
      </Stack>
    </Card>
  );
};

export default CheckoutSummary;
