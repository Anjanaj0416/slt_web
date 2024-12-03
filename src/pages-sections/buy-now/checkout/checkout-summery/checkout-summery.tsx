import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
// LOCAL CUSTOM COMPONENT
import ListItem from "../list-item";
// GLOBAL CUSTOM COMPONENTS
import { Paragraph } from "components/Typography";
// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";
import useBuyNowItemService from "hooks/useBuyNowItemService";

const CheckoutSummary = () => {
  const { totalPrice, totalDiscount } = useBuyNowItemService();
  //
  return (
    <Card sx={{ p: 3 }}>
      <ListItem mb={1} title="Subtotal" value={totalPrice} />
      <ListItem mb={1} title="Shipping" />
      <ListItem mb={1} title="Discount" value={totalDiscount} />

      <Divider sx={{ my: 2 }} />

      <Paragraph fontSize={25} fontWeight={600} lineHeight={1}>
        {currency(totalPrice - totalDiscount)}
      </Paragraph>
    </Card>
  );
};

export default CheckoutSummary;
