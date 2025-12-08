import Category1 from "./Category.model";

export type DeliveryPartnerType = "KOOMBIYO" | "SELF_PICKUP" | "OTHER";

export interface Product1 {
  id: string;
  weight: number;
  minPrice: number;
  maxPrice: number;
  discountAmount: number;
  discountType: DiscountType;
  productType: "QUOTATION" | "DIRECT_BUYING";
  productStatus:
    | "IN_REVIEW"
    | "APPROVED"
    | "PUBLISH"
    | "DISABLED"
    | "UNPUBLISHED";
  deliveryPartner: DeliveryPartnerType;
  variants?: ProductVariant[];
  brand?: string;
  images?: string[];
  videos?: string[];
  tags?: string[];
  category: Category1;
  description: string;
  specification: string;
  name: string;
}

export interface VariantAttribute {
  name: string;
  value: string;
}

export interface ProductVariant {
  id: string;
  sku: string;
  units: number;
  price: number;
  image?: string;
  reOrderLevel: number;
  attributes: VariantAttribute[];
  createdAt: Date;
  lastUpdatedAt: Date;
}

export type DiscountType = "NONE" | "PERCENTAGE" | "FLAT";
