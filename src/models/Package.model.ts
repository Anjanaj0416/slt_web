import { Product1, ProductVariant } from "./Product.model";

export type PackageStatus =
  | "PENDING"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";
export type PackageItem = {
  productId: string;
  productName: string;
  basePrice: string;
  brand: string;
  status: PackageStatus;
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
