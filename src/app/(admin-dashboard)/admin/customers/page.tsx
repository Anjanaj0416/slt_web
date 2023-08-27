import { Metadata } from "next";
import { CustomersPageView } from "pages-sections/vendor-dashboard/customers/page-view";
// API FUNCTIONS
import api from "utils/__api__/dashboard";

export const metadata: Metadata = {
  title: "Customers - Next.js E-commerce Template",
  description: "Bazaar Vendor Dashboard Page View",
};

export default async function Customers() {
  const customers = await api.customers();
  return <CustomersPageView customers={customers} />;
}
