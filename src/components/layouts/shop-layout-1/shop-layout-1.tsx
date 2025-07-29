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

      {/* NAVIGATION BAR */}
      <Navbar elevation={0} border={1} />
      {pathname !== "/mobile-categories" && (
        <Container sx={{ px: 0 }}>
          {pathSegments.length > 0 && (
            <Box
              mt={2}
              sx={{
                pl: {
                  xs: 4, // padding-left on extra-small (mobile)
                  sm: 4, // still apply on small
                  md: 0, // remove padding on medium and up
                },
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
        </Container>
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
