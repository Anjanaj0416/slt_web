import API from "constants/orders";
import { Metadata } from "next";
import { OrdersPageView } from "pages-sections/customer-dashboard/orders/page-view";
// API FUNCTIONS
import api from "utils/__api__/orders";
import { auth } from "utils/auth";
import request from "utils/request";

export const metadata: Metadata = {
  title: "Orders - Bazaar Next.js E-commerce Template",
  description: `Bazaar is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [{ name: "UI-LIB", url: "https://ui-lib.com" }],
  viewport: "width=device-width, initial-scale=1",
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};

export default async function Orders() {
  const { user } = await auth();
  //
  const orders = await request(API.GET_USER_ORDERS, {
    userId: user?.id,
    query: "size=10",
  });
  return <OrdersPageView orders={orders?.data} />;
}
