import currencyJs from "currency.js";
import formatDistanceStrict from "date-fns/formatDistanceStrict";

/**
 * GET THE DIFFERENCE DATE FORMAT
 * @param  DATE | NUMBER | STRING
 * @returns FORMATTED DATE STRING
 */

function getDateDifference(date: string | number | Date) {
  const distance = formatDistanceStrict(new Date(), new Date(date));
  return distance + " ago";
}

/**
 * RENDER THE PRODUCT PAGINATION INFO
 * @param page - CURRENT PAGE NUMBER
 * @param perPageProduct - PER PAGE PRODUCT LIST
 * @param totalProduct - TOTAL PRODUCT NUMBER
 * @returns
 */

function renderProductCount(
  page: number,
  perPageProduct: number,
  totalProduct: number
) {
  let startNumber = (page - 1) * perPageProduct;
  let endNumber = page * perPageProduct;

  if (endNumber > totalProduct) {
    endNumber = totalProduct;
  }
  return `Showing ${startNumber - 1}-${endNumber} of ${totalProduct} products`;
}

/**
 * CALCULATE PRICE WITH PRODUCT DISCOUNT THEN RETURN NEW PRODUCT PRICES
 * @param  price - PRODUCT PRICE
 * @param  discount - DISCOUNT PERCENT
 * @returns - RETURN NEW PRICE
 */

function calculateDiscountPrice(
  price: number,
  discount: number,
  formatted = true
) {
  const afterDiscount = Number((price - price * (discount / 100)).toFixed(2));
  if (!formatted) {
    return afterDiscount;
  }
  return currency(afterDiscount);
}

/**
 * CALCULATE DISCOUNT AMOUNT
 * @param  type - DISCOUNT TYPE
 * @param  price - PRODUCT PRICE
 * @param  discount - DISCOUNT VALUE
 * @returns - RETURN DISCOUNT
 */

function calculateDiscountAmount(
  type: "NONE" | "PERCENTAGE" | "FLAT",
  price: number,
  discount: number
) {
  if (!discount || type === "NONE") {
    return 0;
  } else if (type === "PERCENTAGE") {
    return price * discount * 0.01;
  }

  return discount;
}

/**
 * Calculates the discount percentage based on the discount type, price, and discount amount.
 *
 * @param {"NONE" | "PERCENTAGE" | "FLAT"} type - The type of discount applied.
 * @param {number} price - The original price of the item.
 * @param {number} discount - The discount amount.
 * @returns {number} The calculated discount percentage
 * */

function calculateDiscountPercentage(
  type: "NONE" | "PERCENTAGE" | "FLAT",
  price: number,
  discount: number
) {
  if (!discount || type === "NONE") {
    return 0;
  } else if (type === "PERCENTAGE") {
    return discount;
  }
  const percentage = (discount / price) * 100;
  const isInt = percentage.toFixed(2).split(".")[1] === "00";

  return isInt ? percentage : +percentage.toFixed(2);
}

/**
 * CHANGE THE CURRENCY FORMAT
 * @param  price - PRODUCT PRICE
 * @param  fraction - HOW MANY FRACTION WANT TO SHOW
 * @returns - RETURN PRICE WITH CURRENCY
 */

function currency(
  price: number | string,
  fraction: number = 2,
  symbol: string = "LKR "
) {
  const formatCurrency = currencyJs(`${price}`).format({
    precision: fraction,
    symbol,
  });
  return formatCurrency;
}

export {
  currency,
  getDateDifference,
  calculateDiscountPrice,
  renderProductCount,
  calculateDiscountAmount,
  calculateDiscountPercentage,
};
