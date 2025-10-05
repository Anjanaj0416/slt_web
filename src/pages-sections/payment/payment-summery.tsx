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
import { CartItem } from "models/User.model";

type Props = {
  type: "CART" | "BUY_NOW";
};
const isSelfPickupOrder = (items: CartItem[]) =>
  items.some((item) => item.deliveryPartner === "SELF_PICKUP");
//
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
    if (type === "BUY_NOW" && !isSelfPickupOrder(items)) {
      const body = items.map(({ productVariant, units }) => ({
        productVariantId: productVariant.id,
        units,
      }));
      getShippingCost({ body });
    }
  }, [getShippingCost, items, type]);

  const shippingCost =
    type === "CART"
      ? isSelfPickupOrder(cart.cartItems)
        ? 0
        : cart?.shippingCost
      : isSelfPickupOrder(items)
        ? 0
        : shippingData?.shippingCost;
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
