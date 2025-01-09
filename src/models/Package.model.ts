import { DiscountType, ProductVariant } from "./Product.model";

export type PackageStatus =
  | "PENDING"
  | "PROCESSING"
  | "PICKUP_REQUESTED"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"
  | "FAILED";
export type PackageItem = {
  productId: string;
  productName: string;
  basePrice: string;
  brand: string;
  status: PackageStatus;
  productDiscountType: DiscountType;
  productDiscountAmount: number;
  discount: number;
  price: number;
  images: string[];
  productVariant: ProductVariant;
  units: number;
};

interface Package {
  id: string;
  status: PackageStatus;
  packageItems: PackageItem[];
  createdAt: Date;
}

export default Package;
