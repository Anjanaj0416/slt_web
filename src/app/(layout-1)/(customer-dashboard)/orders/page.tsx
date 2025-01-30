import API from "constants/orders";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { OrdersPageView } from "pages-sections/customer-dashboard/orders/page-view";
import { auth } from "utils/auth";
import request from "utils/request";

export const metadata: Metadata = {
  title: "Orders - TRADEZ ",
  description: `TRADEZ is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [{ name: "UI-LIB", url: "https://ui-lib.com" }],
  viewport: "width=device-width, initial-scale=1",
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};

export default async function Orders() {
  try {
    const { user } = await auth();
    //
    const orders = await request(API.GET_USER_ORDERS, {
      userId: user?.id,
      query: "size=5&sort=createdAt,desc",
    });
    return (
      <OrdersPageView
        orders={orders?.data}
        initTotalPages={orders.totalPages}
      />
    );
  } catch (error) {
    console.error(error);
    notFound();
  }
}
