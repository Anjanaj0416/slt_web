import { POSTAddressRequest } from "./Address.model";
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
  createdAt: Date;
  updatedAt: Date;
  orderStatus: "Pending" | "Processing" | "Delivered" | "Cancelled";
  shippingAddress: POSTAddressRequest;
  billingAddress: POSTAddressRequest;
  note: string;
  orderDetails: any[];
  payments: [
    {
      amount: number;
      paymentType: string;
    },
  ];
}

export default Order;
