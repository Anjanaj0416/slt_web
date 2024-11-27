import API from "constants/address";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckoutPageView } from "pages-sections/checkout/page-view";
import { auth } from "utils/auth";
import request from "utils/request";

export const metadata: Metadata = {
  title: "Checkout - SLT Marcketplace Next.js E-commerce Template",
  description: `SLT Marcketplace is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [{ name: "UI-LIB", url: "https://ui-lib.com" }],
  viewport: "width=device-width, initial-scale=1",
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};

export default async function Checkout() {
  try {
    const { user } = await auth();
    const { data } = await request(API.GET_ADDRESS, {
      userId: user?.id,
    });
    console.log(data);
    
    //
    return <CheckoutPageView address={data} />;
  } catch (error) {
    notFound();
  }
}
