import Package from "models/Package.model";

const calculateOrderTotalAmount = (packages: Package[]) => {
  let total = 0;
  let subTotal = 0;
  packages?.forEach((pkg) => {
    pkg.packageItems.forEach((pkgItm) => {
      const { price, units, discount } = pkgItm;
      total += (price - discount) * units;
      subTotal += price * units;
    });
  });
  return { total, subTotal };
};

export default calculateOrderTotalAmount;
