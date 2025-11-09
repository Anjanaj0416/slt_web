import API from "constants/address";
import { Metadata } from "next";
import { AddressPageView } from "pages-sections/customer-dashboard/address/page-view";
import { auth } from "utils/auth";
import { cachedRequest } from "utils/request";

export const metadata: Metadata = {
  title: "Address - TRADEZ ",
  description: `TRADEZ is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,

  viewport: "width=device-width, initial-scale=1",
  keywords: ["Tradez"],
};

export default async function Address({ searchParams }) {
  const page = searchParams?.page;
  const { user } = await auth();

  const safePage = Number.isInteger(page) && page > 0 ? page : 1;

  const query =
    safePage === 1
      ? "size=8&sort=primary,asc"
      : `page=${safePage - 1}&size=8&sort=primary,desc&sort=createdAt,asc`;

  const addressesData = await cachedRequest(API.GET_ADDRESS, {
    userId: user?.id,
    query,
  });

  return (
    <AddressPageView
      addressList={addressesData.data}
      totalPages={addressesData.totalPages}
      page={addressesData.page}
    />
  );
}
