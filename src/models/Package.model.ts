import {
  DeliveryPartnerType,
  DiscountType,
  ProductVariant,
} from "./Product.model";

export type PackageStatus =
  | "PENDING"
  | "PROCESSING"
  | "PICKUP_REQUESTED"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"
  | "RETURNED"
  | "FAILED";
export type PackageItem = {
  productId: string;
  productName: string;
  brand: string;
  status: PackageStatus;
  deliveryPartner: DeliveryPartnerType;
  productDiscountType: DiscountType;
  productDiscountAmount: number;
  discount: number;
  price: number;
  images: string[];
  productVariant: ProductVariant;
  units: number;
  weight: number;
};

interface Package {
  id: string;
  packageNumber: string;
  status: PackageStatus;
  packageItems: PackageItem[];
  shippingCost: number;
  deliveryReferenceId: string;
  createdAt: Date;
}

export default Package;
