import type { Metadata } from "next";
import { PropsWithChildren, ReactNode } from "react";
import { Open_Sans } from "next/font/google";

export const openSans = Open_Sans({ subsets: ["latin"] });

// THEME PROVIDER
import ThemeProvider from "theme/theme-provider";

// THIRD PARTY CSS MODULES
import "nprogress/nprogress.css";
import "simplebar-react/dist/simplebar.min.css";

// IMPORT DUMMY SERVER
import "__server__";
import CartProvider from "contexts/CartContext";

export const metadata: Metadata = {
  title: "Bazaar - Next.js E-commerce Template",
  description: `Bazaar is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [{ name: "UI-LIB", url: "https://ui-lib.com" }],
  viewport: "width=device-width, initial-scale=1",
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={openSans.className}>
        <CartProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </CartProvider>
      </body>
    </html>
  );
}
