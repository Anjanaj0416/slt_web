import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
// LOCAL CUSTOM COMPONENT
import ListItem from "../list-item";
// GLOBAL CUSTOM COMPONENTS
import { Paragraph } from "components/Typography";
// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";
import useBuyNowItemService from "hooks/useBuyNowItemService";
import { useGetShippingCostMutation } from "services/delivery-api";
import { useEffect } from "react";

const CheckoutSummary = () => {
  const { totalPrice, totalDiscount, items } = useBuyNowItemService();
  const [getShippingCost, { data: shippingData }] =
    useGetShippingCostMutation();

  useEffect(() => {
    const body = items.map(({ productVariant, units }) => ({
      productVariantId: productVariant.id,
      units,
    }));
    getShippingCost({ body });
  }, []);
  //
  return (
    <Card sx={{ p: 3 }}>
      <ListItem mb={1} title="Subtotal" value={totalPrice} />
      <ListItem mb={1} title="Shipping" value={shippingData?.shippingCost} />
      <ListItem mb={1} title="Discount" value={totalDiscount} />

      <Divider sx={{ my: 2 }} />

      <Paragraph fontSize={25} fontWeight={600} lineHeight={1}>
        {shippingData && currency(totalPrice + shippingData?.shippingCost - totalDiscount)}
      </Paragraph>
    </Card>
  );
};

export default CheckoutSummary;
