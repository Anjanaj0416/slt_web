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
  units?: any;
  price: number;
  discount: number;
  discountType: "NONE" | "PERCENTAGE" | "FLAT";
  productType:"QUOTATION" |"DIRECT_BUYING";
  id: string;
  brand?: string;
  images?: string[];
  videos?: string[];
  category?: Category1;
  description:string;
  specification:string;
  name: string;
}

export default Product;
