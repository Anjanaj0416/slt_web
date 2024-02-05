import { Product1 } from "./Product.model";

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
  product: Product1;
  units: number;
}
//
export interface UserCart {
  id: string;
  cartItems: Array<CartItem>;
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
}
//
export default User;
