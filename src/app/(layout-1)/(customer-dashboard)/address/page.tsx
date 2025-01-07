import API from "constants/address";
import { Metadata } from "next";
import { AddressPageView } from "pages-sections/customer-dashboard/address/page-view";
import { auth } from "utils/auth";
import request from "utils/request";

export const metadata: Metadata = {
  title: "Address - TRADEZ ",
  description: `TRADEZ is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [{ name: "UI-LIB", url: "https://ui-lib.com" }],
  viewport: "width=device-width, initial-scale=1",
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};

export default async function Address({ searchParams }) {
  const page = searchParams?.page;
  const { user } = await auth();

  const addressesData = await request(API.GET_ADDRESS, {
    userId: user?.id,
    query:
      isNaN(page) && page >= 0
        ? "size=6&primary,asc"
        : `page=${page - 1}&size=6&sort=primary,desc&sort=createdAt,asc`,
  });

  return (
    <AddressPageView
      addressList={addressesData.data}
      totalPages={addressesData.totalPages}
      page={addressesData.page}
    />
  );
}
