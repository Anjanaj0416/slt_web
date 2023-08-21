import { Metadata } from "next";
import { OrdersPageView } from "pages-sections/customer-dashboard/orders/page-view";
// API FUNCTIONS
import api from "utils/__api__/orders";

export const metadata: Metadata = {
  title: "Orders - Next.js E-commerce Template",
  description: "Bazaar Orders Page View",
};

export default async function Orders() {
  const orders = await api.getOrders();
  return <OrdersPageView orders={orders} />;
}
