import { Order1 } from "models/Order.model";

export const calculateOrderPriceSummary = (order: Order1) => {
  let totalPrice = 0;
  let totalDiscount = 0;
  let totalShippingCost = 0;
  let subTotal = 0;
//console.log(order);

  for (const pkg of order.packages) {
    totalShippingCost += pkg.shippingCost;

    for (const item of pkg.packageItems) {
      const itemTotalPrice = item.price * item.units;
      const itemTotalDiscount = item.discount * item.units;

      totalPrice += itemTotalPrice;
      totalDiscount += itemTotalDiscount;
      subTotal += itemTotalPrice;
    }
  }

  totalPrice += totalShippingCost - totalDiscount;

  return {
    totalPrice,
    totalDiscount,
    totalShippingCost,
    subTotal,
  };
}

export default calculateOrderPriceSummary;
