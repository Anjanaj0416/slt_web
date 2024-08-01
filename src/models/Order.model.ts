import { POSTAddressResponse } from "./Address.model";
import Package from "./Package.model";
import Payment from "./Payment.model";
import User from "./User.model";

type Item = {
  product_img: string;
  product_name: string;
  product_price: number;
  product_quantity: number;
};

interface Order {
  user: User;
  id: string;
  tax: number;
  items: Item[];
  createdAt: Date;
  discount: number;
  deliveredAt: Date;
  totalPrice: number;
  isDelivered: boolean;
  shippingAddress: string;
  status: "Pending" | "Processing" | "Delivered" | "Cancelled";
}

export interface Order1 {
  id: string;
  //status: "Pending" | "Processing" | "Delivered" | "Cancelled";
  payments: Payment[];
  packages: Package[];
  //items: Item[];
  shippingAddress: POSTAddressResponse;
  billingAddress: POSTAddressResponse;
  note: string;
  createdAt: Date;
}

export default Order;
