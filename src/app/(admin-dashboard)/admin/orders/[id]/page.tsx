import { Metadata } from "next";
import { notFound } from "next/navigation";
import { OrderDetailsPageView } from "pages-sections/vendor-dashboard/orders/page-view";
// API FUNCTIONS
import api from "utils/__api__/dashboard";

export const metadata: Metadata = {
  title: "Order Details - Next.js E-commerce Template",
  description: "Bazaar Order Details View",
};

export default async function OrderDetails({ params }: { params: { id: string } }) {
  try {
    const order = await api.getOrder(String(params.id));
    return <OrderDetailsPageView order={order} />;
  } catch (error) {
    notFound();
  }
}
