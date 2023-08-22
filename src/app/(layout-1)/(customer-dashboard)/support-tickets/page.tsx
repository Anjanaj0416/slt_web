import { Metadata } from "next";
import { TicketsPageView } from "pages-sections/customer-dashboard/support-tickets/page-view";
// API FUNCTIONS
import api from "utils/__api__/ticket";

export const metadata: Metadata = {
  title: "Support Tickets - Next.js E-commerce Template",
  description: "Bazaar Support Tickets Page View",
};

export default async function SupportTickets() {
  const tickets = await api.getTicketList();
  return <TicketsPageView tickets={tickets} />;
}
