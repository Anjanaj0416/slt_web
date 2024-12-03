"use client";
import { BuyNowPageStepper } from "components/layouts/shop-layout-1";
import useBuyNowItemService from "hooks/useBuyNowItemService";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  const router = useRouter()
  const { items } = useBuyNowItemService();
  if (items?.length < 1) {
    router.push('/');
  } else {
    return <BuyNowPageStepper>{children}</BuyNowPageStepper>;
  }
}
