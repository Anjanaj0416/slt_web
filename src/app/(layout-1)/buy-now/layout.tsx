"use client";
import { BuyNowPageStepper } from "components/layouts/shop-layout-1";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return <BuyNowPageStepper>{children}</BuyNowPageStepper>;
}
