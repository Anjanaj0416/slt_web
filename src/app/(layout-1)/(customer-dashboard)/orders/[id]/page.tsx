import API from "constants/orders";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { OrderDetailsPageView } from "pages-sections/customer-dashboard/orders/page-view";
// API FUNCTIONS
import { auth } from "utils/auth";
import { cachedRequest } from "utils/request";

export const metadata: Metadata = {
  title: "Order Details - TRADEZ ",
  viewport: "width=device-width, initial-scale=1",
};

export default async function OrderDetails({
  params,
}: {
  params: { id: string };
}) {
  try {
    const { user } = await auth();
    const order = await cachedRequest(API.GET_USER_ORDER, {
      userId: user?.id,
      orderId: params.id,
    });
    return <OrderDetailsPageView order={order} />;
  } catch (error) {
    console.error(error);
    notFound();
  }
}
