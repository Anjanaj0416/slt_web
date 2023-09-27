import { Metadata } from "next";
import { PropsWithChildren } from "react";
import { Open_Sans } from "next/font/google";

export const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bazaar - Next.js E-commerce Template",
  description: `Bazaar is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [{ name: "UI-LIB", url: "https://ui-lib.com" }],
  viewport: "width=device-width, initial-scale=1",
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};

// THEME PROVIDER
import ThemeProvider from "theme/theme-provider";
// PRODUCT CART PROVIDER
import CartProvider from "contexts/CartContext";
// SITE SETTINGS PROVIDER
import SettingsProvider from "contexts/SettingContext";
// GLOBAL CUSTOM COMPONENTS
import { RTL } from "components/rtl";
import { ProgressBar } from "components/progress";

// THIRD PARTY CSS MODULES
import "nprogress/nprogress.css";
import "simplebar-react/dist/simplebar.min.css";

// IMPORT DUMMY SERVER
import "__server__";

// IMPORT i18n SUPPORT FILE
// import "i18n";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={openSans.className}>
        <CartProvider>
          <SettingsProvider>
            <RTL>
              <ThemeProvider>
                <ProgressBar />
                {children}
              </ThemeProvider>
            </RTL>
          </SettingsProvider>
        </CartProvider>
      </body>
    </html>
  );
}
