import Shop from "./Shop.model";
import Review from "./Review.model";
import Category1 from "./Category.model";

interface Product {
  unit?: any;
  slug: string;
  price: number;
  title: string;
  rating: number;
  discount: number;
  thumbnail: string;
  id: string;
  shop?: Shop;
  brand?: string;
  size?: string[];
  status?: string;
  colors?: string[];
  images?: string[];
  categories: any[];
  reviews?: Review[];
  published?: boolean;
}

//
export interface Product1 {
  id: string;
  //units?: any;
  basePrice: string;
  discountAmount: number;
  discountType: "NONE" | "PERCENTAGE" | "FLAT";
  productType: "QUOTATION" | "DIRECT_BUYING";
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

export default Product;
