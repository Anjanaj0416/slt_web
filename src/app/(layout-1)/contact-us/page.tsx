import { Metadata } from "next";
// PAGE VIEW COMPONENT
import { ContactUsPageView } from "pages-sections/contact-us/page-view";

export const metadata: Metadata = {
  title: "Contact US - TRADEZ ",
  description: `TRADEZ is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [{ name: "UI-LIB", url: "https://ui-lib.com" }],
  viewport: "width=device-width, initial-scale=1",
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};

export default function Shops() {
  return <ContactUsPageView />;
}
