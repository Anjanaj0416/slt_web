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
import { useGetShippingCostMutation } from "services/delivery-api";
import { useEffect } from "react";

type Props = {
  type: "CART" | "BUY_NOW";
};
const PaymentSummary = ({ type }: Props) => {
  const { totalPrice, totalDiscount, cart } = useCartService();
  const {
    totalPrice: buyingSubTotal,
    totalDiscount: buyingDiscount,
    items,
  } = useBuyNowItemService();

  const [getShippingCost, { data: shippingData }] =
    useGetShippingCostMutation();
  useEffect(() => {
    if (type === "BUY_NOW") {
      const body = items.map(({ productVariant, units }) => ({
        productVariantId: productVariant.id,
        units,
      }));
      getShippingCost({ body });
    }
  }, [type]);

  const shippingCost =
    type === "CART" ? cart?.shippingCost : shippingData?.shippingCost;
  const buyingTotal = shippingCost
    ? buyingSubTotal + shippingCost - buyingDiscount
    : null;
  return (
    <Card sx={{ padding: { sm: 3, xs: 2 } }}>
      <PaymentItem
        title="Subtotal:"
        amount={type === "CART" ? totalPrice : buyingSubTotal}
      />
      <PaymentItem title="Shipping:" amount={shippingCost} />
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
          ? currency(totalPrice + shippingCost - totalDiscount)
          : buyingTotal && currency(buyingTotal)}
      </Paragraph>
    </Card>
  );
};

export default PaymentSummary;
