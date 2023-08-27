import { Metadata } from "next";
import { SupportTicketsPageView } from "pages-sections/vendor-dashboard/support-tickets/page-view";
// API FUNCTIONS
import api from "utils/__api__/ticket";

export const metadata: Metadata = {
  title: "Support Tickets - Next.js E-commerce Template",
  description: "Bazaar Vendor Dashboard Page View",
};

export default async function SupportTickets() {
  const tickets = await api.getTicketList();
  return <SupportTicketsPageView tickets={tickets} />;
}
