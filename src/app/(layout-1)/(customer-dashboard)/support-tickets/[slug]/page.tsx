import { Metadata } from "next";
import { notFound } from "next/navigation";
import { TicketDetailsPageView } from "pages-sections/customer-dashboard/support-tickets/page-view";
// API FUNCTIONS
import api from "utils/__api__/ticket";

export const metadata: Metadata = {
  title: "Order Details - Next.js E-commerce Template",
  description: "Bazaar Order Details View",
};

export default async function SupportTicketDetails({ params }) {
  try {
    const ticket = await api.getTicket(String(params.slug));
    return <TicketDetailsPageView ticket={ticket} />;
  } catch (error) {
    notFound();
  }
}
