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
import SessionProviderWrapper from "utils/session-provider-wrapper";
import { UnauthenticatedModalProvider } from "components/modals/unauthenticated-action-modal";
import CartServiceProvider from "contexts/CartServiceContext";
import CheckoutServiceContextProvider from "contexts/CheckoutServiceContext";
import WishlistProvider from "contexts/WishlistContext";
import BuyNowItemServiceProvider from "contexts/BuyNowItemServiceContext";
//
export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <ReduxProviderWrapper store={store}>
      <SessionProviderWrapper>
        <html lang="en" suppressHydrationWarning>
          <body className={openSans.className}>
            <UnauthenticatedModalProvider>
              <CartServiceProvider>
                <CheckoutServiceContextProvider>
                  <CartProvider>
                    <WishlistProvider>
                      <BuyNowItemServiceProvider>
                        <SettingsProvider>
                          <ThemeProvider>
                            <ProgressBar />
                            <RTL>
                              <SnackbarProvider>{children}</SnackbarProvider>
                            </RTL>
                          </ThemeProvider>
                        </SettingsProvider>
                      </BuyNowItemServiceProvider>
                    </WishlistProvider>
                  </CartProvider>
                </CheckoutServiceContextProvider>
              </CartServiceProvider>
            </UnauthenticatedModalProvider>
          </body>
        </html>
      </SessionProviderWrapper>
    </ReduxProviderWrapper>
  );
}
