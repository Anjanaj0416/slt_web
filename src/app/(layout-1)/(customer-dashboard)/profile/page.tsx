import API from "constants/orders";
import { Metadata } from "next";
import { ProfilePageView } from "pages-sections/customer-dashboard/profile/page-view";
import { auth } from "utils/auth";
import { cachedRequest } from "utils/request";

export const metadata: Metadata = {
  title: "Profile - TRADEZ ",
  description: `TRADEZ is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [{ name: "UI-LIB", url: "https://ui-lib.com" }],
  viewport: "width=device-width, initial-scale=1",
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};

export default async function Profile() {
  const { user } = await auth();
  //
  const queries = {
    allOrders: "size=0&sort=createdAt,desc",
    processingOrders: "packageStatus=PENDING&size=0&sort=createdAt,desc",
    shippedOrders: "packageStatus=SHIPPED&size=0&sort=createdAt,desc",
    deliveredOrders: "packageStatus=DELIVERED&size=0&sort=createdAt,desc",
  };
  const userId = user?.id;
  const [allOrders, processingOrders, shippedOrders, deliveredOrders] =
    await Promise.all([
      cachedRequest(API.GET_USER_ORDERS, { userId, query: queries.allOrders }),
      cachedRequest(API.GET_USER_ORDERS, {
        userId,
        query: queries.processingOrders,
      }),
      cachedRequest(API.GET_USER_ORDERS, {
        userId,
        query: queries.shippedOrders,
      }),
      cachedRequest(API.GET_USER_ORDERS, {
        userId,
        query: queries.deliveredOrders,
      }),
    ]);
  return (
    <ProfilePageView
      ordersCount={allOrders.totalResults}
      processingOrdersCount={processingOrders.totalResults}
      shippedOrdersCount={shippedOrders.totalResults}
      deliveredOrdersCount={deliveredOrders.totalResults}
    />
  );
}
