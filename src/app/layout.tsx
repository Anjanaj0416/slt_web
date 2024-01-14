import { ReactNode } from "react";
import { Open_Sans } from "next/font/google";

export const openSans = Open_Sans({ subsets: ["latin"] });

// THEME PROVIDER
import ThemeProvider from "theme/theme-provider";
// PRODUCT CART PROVIDER
import CartProvider from "contexts/CartContext";
// SITE SETTINGS PROVIDER
import SettingsProvider from "contexts/SettingContext";
// GLOBAL CUSTOM COMPONENTS
import { RTL } from "components/rtl";
import { ProgressBar } from "components/progress";

// IMPORT DUMMY SERVER
import "__server__";

// IMPORT i18n SUPPORT FILE
import "i18n";
import ReduxProviderWrapper from "utils/redux-provider-wrapper";
import { store } from "./redux/store";
import SnackbarProvider from "components/SnackbarProvider";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ReduxProviderWrapper store={store}>
      <html lang="en" suppressHydrationWarning>
        <body className={openSans.className}>
          <CartProvider>
            <SettingsProvider>
              <ThemeProvider>
                <ProgressBar />
                <RTL>
                  <SnackbarProvider>{children}</SnackbarProvider>
                </RTL>
              </ThemeProvider>
            </SettingsProvider>
          </CartProvider>
        </body>
      </html>
    </ReduxProviderWrapper>
  );
}
