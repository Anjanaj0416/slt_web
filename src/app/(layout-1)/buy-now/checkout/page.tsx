import API from "constants/address";
import { Metadata } from "next";
import BuyNowCheckoutPageView from "pages-sections/buy-now/checkout/page-view/checkout";
import { auth } from "utils/auth";
import request from "utils/request";
// PAGE VIEW COMPONENT

export const metadata: Metadata = {
  title: "Checkout - TRADEZ ",
  description: `TRADEZ is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [{ name: "UI-LIB", url: "https://ui-lib.com" }],
  viewport: "width=device-width, initial-scale=1",
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};

export default async function Shops() {
  const { user } = await auth();
  const { data } = await request(API.GET_ADDRESS, {
    userId: user?.id,
  });
  return <BuyNowCheckoutPageView address={data} />;
}
