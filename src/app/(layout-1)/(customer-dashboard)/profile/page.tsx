import API from "constants/orders";
import { Metadata } from "next";
import { ProfilePageView } from "pages-sections/customer-dashboard/profile/page-view";
import { auth } from "utils/auth";
import request from "utils/request";

export const metadata: Metadata = {
  title: "Profile - SLT Marcketplace Next.js E-commerce Template",
  description: `SLT Marcketplace is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [{ name: "UI-LIB", url: "https://ui-lib.com" }],
  viewport: "width=device-width, initial-scale=1",
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};

export default async function Profile() {
  const { user } = await auth();
  //
  const allOrders = await request(API.GET_USER_ORDERS, {
    userId: user?.id,
    query: "size=0&sort=createdAt,desc",
  });
  const processingOrders = await request(API.GET_USER_ORDERS, {
    userId: user?.id,
    query: "packageStatus=PENDING&size=0&sort=createdAt,desc",
  });
  const shippedOrders = await request(API.GET_USER_ORDERS, {
    userId: user?.id,
    query: "packageStatus=SHIPPED&size=0&sort=createdAt,desc",
  });
  const deliveredOrders = await request(API.GET_USER_ORDERS, {
    userId: user?.id,
    query: "packageStatus=DELIVERED&size=0&sort=createdAt,desc",
  });
  return (
    <ProfilePageView
      ordersCount={allOrders.totalResults}
      processingOrdersCount={processingOrders.totalResults}
      shippedOrdersCount={shippedOrders.totalResults}
      deliveredOrdersCount={deliveredOrders.totalResults}
    />
  );
}
