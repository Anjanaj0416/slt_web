"use client";

import {
  FC,
  Fragment,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
// GLOBAL CUSTOM COMPONENTS
import { Sticky } from "components/sticky";
import { Topbar } from "components/topbar";
import { Navbar } from "components/navbar";
import { Footer1 } from "components/footer";
import Header from "components/header/header";
import { SearchInputWithCategory } from "components/search-box";
import { MobileNavigationBar } from "components/mobile-navigation";
import { usePathname } from "next/navigation";
import { Box, Breadcrumbs, Container, Typography } from "@mui/material";
import Link from "next/link";
import useHeader from "components/header/use-header";

/**
 *  USED IN:
 *  1. market-1, market-2, gadget-shop, fashion-shop, fashion-2, fashion-3, furniture-shop, grocery-3, gift-shop
 *  2. product details page
 *  3. order-confirmation page
 *  4. product-search page
 *  5. shops and shops-details page
 */

const ShopLayout1: FC<PropsWithChildren> = ({ children }) => {
  const [isFixed, setIsFixed] = useState(false);
  const toggleIsFixed = useCallback((fixed: boolean) => setIsFixed(fixed), []);
  const pathname = usePathname();
  const [pathSegments, setPathSegments] = useState<string[]>([]);
  const {
    dialogOpen,
    sidenavOpen,
    searchBarOpen,
    toggleDialog,
    toggleSearchBar,
    toggleSidenav,
  } = useHeader();
  useEffect(() => {
    // Get the pathname and split it
    const segments = pathname
      .split("?")[0]
      .split("/")
      .filter(Boolean)
      .filter((segment) => segment !== "search");

    if (segments.length > 1 && segments[0] === "products") {
      segments[1] = pathname.includes("search")
        ? "Search"
        : decodeURIComponent(segments[1].split("_")?.[1]);
    }
    if (segments.length > 1 && segments[0] === "shops") {
      segments[1] = decodeURIComponent(segments[1].split("_")?.[1]);
    }
    if (segments.length > 1 && segments[0] === "orders") {
      const orderNumber = decodeURIComponent(segments[1].split("_")?.[1]);
      segments[1] = String(orderNumber)?.padStart(8, "0");
    }
    if (segments.length > 1 && segments[0] === "profile") {
      segments[1] = "Edit Profile";
    }
    if (segments.length > 1 && segments[0] === "buy-now") {
      if(segments[1]==="items"){
        segments[1]="Buy Now - Items"
      }
      delete segments[0];
    }
    setPathSegments(segments);
  }, [pathname]);
  return (
    <Fragment>
      {/* TOP BAR SECTION */}
      <Topbar />

      {/* HEADER */}
      <Sticky fixedOn={0} onSticky={toggleIsFixed} scrollDistance={300}>
        <Header
          isFixed={isFixed}
          searchInput={
            <SearchInputWithCategory
              searchBarOpen={false}
              toggleSearchBar={toggleSearchBar}
            />
          }
          sidenavOpen={sidenavOpen}
          dialogOpen={dialogOpen}
          searchBarOpen={searchBarOpen}
          toggleSidenav={toggleSidenav}
          toggleDialog={toggleDialog}
          toggleSearchBar={toggleSearchBar}
        />
      </Sticky>

      {pathname !== "/mobile-categories" && (
        <Box sx={{ px: 0 }}>
          {pathSegments.length > 0 && (
            <Box
              mt={2}
              sx={{
                px: { xs: 2, md: 16 },
              }}
            >
              <Breadcrumbs aria-label="breadcrumb">
                <Link href="/" style={{ textTransform: "capitalize" }}>
                  Home
                </Link>
                {pathSegments.map((segment, index) => {
                  const isLast = index === pathSegments.length - 1;

                  if (isLast || segment.toLowerCase() === "products") {
                    return (
                      <Typography
                        key={index}
                        color="text.primary"
                        textTransform="capitalize"
                      >
                        {segment}
                      </Typography>
                    );
                  }
                  return (
                    <Link
                      key={index}
                      href={`/${segment}`}
                      style={{ textTransform: "capitalize" }}
                    >
                      {segment}
                    </Link>
                  );
                })}
              </Breadcrumbs>
            </Box>
          )}
        </Box>
      )}

      {/* BODY CONTENT */}
      {children}

      {/* SMALL DEVICE BOTTOM NAVIGATION */}
      <MobileNavigationBar />

      {/* FOOTER */}
      <Footer1 />
    </Fragment>
  );
};

export default ShopLayout1;
