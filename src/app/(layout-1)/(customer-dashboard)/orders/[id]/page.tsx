import API from "constants/orders";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { OrderDetailsPageView } from "pages-sections/customer-dashboard/orders/page-view";
// API FUNCTIONS
import { auth } from "utils/auth";
import request from "utils/request";

export const metadata: Metadata = {
  title: "Order Details - TRADEZ ",
  description: `TRADEZ is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [{ name: "UI-LIB", url: "https://ui-lib.com" }],
  viewport: "width=device-width, initial-scale=1",
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};

export default async function OrderDetails({
  params,
}: {
  params: { id: string };
}) {
  try {
    const { user } = await auth();
    const order = await request(API.GET_USER_ORDER, {
      userId: user?.id,
      orderId: params.id,
    });
    return <OrderDetailsPageView order={order} />;
  } catch (error) {
    console.error(error);
    notFound();
  }
}
