import Package from "models/Package.model";

const calculateOrderTotalAmount = (packages: Package[]) => {
  let totalAmount = 0;
  packages?.forEach((pkg) => {
    pkg.packageItems.forEach((pkgItm) => {
      const { price, units } = pkgItm;
      totalAmount += price * units;
    });
  });
  return totalAmount;
};

export default calculateOrderTotalAmount;
