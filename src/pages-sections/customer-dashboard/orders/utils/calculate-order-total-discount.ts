import Package from "models/Package.model";

const calculateOrderTotalDiscount = (packages: Package[]) => {
  let totalDiscount = 0;
  packages?.forEach((pkg) => {
    pkg.packageItems.forEach((pkgItm) => {
      const { discount, units } = pkgItm;
      totalDiscount += discount * units;
    });
  });
  return totalDiscount;
};

export default calculateOrderTotalDiscount;
