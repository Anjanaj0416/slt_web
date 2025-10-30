import API from "constants/address";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckoutPageView } from "pages-sections/checkout/page-view";
import { auth } from "utils/auth";
import { cachedRequest } from "utils/request";

export const metadata: Metadata = {
  title: "Checkout - TRADEZ ",
  description: `TRADEZ is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  viewport: "width=device-width, initial-scale=1",
  keywords: ["Tradez"],
};

export default async function Checkout() {
  try {
    const { user } = await auth();
    const { data } = await cachedRequest(API.GET_ADDRESS, {
      userId: user?.id,
    });
    //
    return <CheckoutPageView address={data} />;
  } catch (error) {
    console.error(error);
    notFound();
  }
}
