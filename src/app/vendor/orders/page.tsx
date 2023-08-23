import { Metadata } from "next";
import { OrdersPageView } from "pages-sections/vendor-dashboard/orders/page-view";
// API FUNCTIONS
import api from "utils/__api__/dashboard";

export const metadata: Metadata = {
  title: "Orders - Next.js E-commerce Template",
  description: "Bazaar Vendor Dashboard Page View",
};

export default async function Orders() {
  const orders = await api.orders();
  return <OrdersPageView orders={orders} />;
}
