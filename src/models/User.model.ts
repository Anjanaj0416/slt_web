import { Product1, ProductVariant } from "./Product.model";

interface User {
  id: string;
  email: string;
  phone: string;
  avatar: string;
  password: string;
  dateOfBirth: Date | string;
  verified: boolean;
  name: { firstName: string; lastName: string };
}
//
export interface CartItem {
  productId: string;
  productName: string;
  basePrice: string;
  brand: string;
  productType: "DIRECT_BUYING" | "QUOTATION";
  discountAmount: number;
  discountType: "NONE" | "PERCENTAGE" | "FLAT";
  images: string[];
  productVariant: ProductVariant;
  units: number;
}
//
export interface UserCart {
  id: string;
  cartItems: Array<CartItem>;
}

export interface UserWishlist {
  id: string;
  products: Array<Product1>;
}
//
export interface User1 {
  id: string;
  email: string;
  phone: string;
  avatar?: string;
  birthDay: Date | string;
  firstName: string;
  lastName: string;
  username: string;
  cart: UserCart;
  wishlist: UserWishlist;
  profilePictureUrl: string;
}
//
export default User;
