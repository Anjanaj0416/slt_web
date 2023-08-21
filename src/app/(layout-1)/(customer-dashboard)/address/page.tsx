import { Metadata } from "next";
import { AddressPageView } from "pages-sections/customer-dashboard/address/page-view";
// API FUNCTIONS
import api from "utils/__api__/address";

export const metadata: Metadata = {
  title: "Address - Next.js E-commerce Template",
  description: "Bazaar Address Page View",
};

export default async function Address() {
  const addressList = await api.getAddressList();
  return <AddressPageView addressList={addressList} />;
}
