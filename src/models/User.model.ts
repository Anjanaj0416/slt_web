import { DeliveryPartnerType, Product1, ProductVariant } from "./Product.model";
import Store from "./Store.model";

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
  minPrice: number;
  maxPrice: number;
  brand: string;
  deliveryPartner: DeliveryPartnerType;
  productType: "DIRECT_BUYING" | "QUOTATION";
  discountAmount: number;
  discountType: "NONE" | "PERCENTAGE" | "FLAT";
  images: string[];
  productVariant: ProductVariant;
  units: number;
  weight: number;
}
//
export interface UserCart {
  id: string;
  shippingCost?: number;
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
  followedStores: Store[] | { id: string }[];
}
//
export default User;
