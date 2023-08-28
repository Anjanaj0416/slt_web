"use client";

import { FC, Fragment, PropsWithChildren, useEffect, useState } from "react";
import { Theme, useMediaQuery, Box, Badge } from "@mui/material";
// CUSTOM ICON COMPONENTS
import Home from "icons/Home";
import User2 from "icons/User2";
import CategoryOutlined from "icons/CategoryOutline";
import ShoppingBagOutlined from "icons/ShoppingBagOutlined";
// GLOBAL CUSTOM HOOKS
import useCart from "hooks/useCart";
// UTILS CONSTANTS
import { layoutConstant } from "utils/constants";
// STYLED COMPONENTS
import { iconStyle, StyledBox, StyledDrawer, StyledNavLink, Wrapper } from "./styles";

/**
 * Difference between MobileNavigationBar and MobileNavigationBar2
 * 1. In the MobileNavigationBar we doesn't use conditionally render
 * 2. In the list array if doesn't exists href property then open category menus sidebar drawer in MobileNavigationBar2
 */

const MobileNavigationBar2: FC<PropsWithChildren> = ({ children }) => {
  const { state } = useCart();
  const [open, setOpen] = useState(false);
  const DOWN_900 = useMediaQuery((theme: Theme) => theme.breakpoints.down(900));

  const { mobileNavHeight, topbarHeight } = layoutConstant;
  const total = mobileNavHeight + topbarHeight;
  const [totalHeight, setTotalHeight] = useState<number>(total);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  useEffect(() => {
    const listener = () => {
      if (window.scrollY > 30) setTotalHeight(mobileNavHeight);
      else setTotalHeight(total);
    };

    window.addEventListener("scroll", listener);
    return () => window.removeEventListener("scroll", listener);
  }, [mobileNavHeight, total]);

  if (DOWN_900) {
    return (
      <Box position="relative" display="flex" flexDirection="column">
        <StyledDrawer
          open={open}
          anchor="left"
          totalheight={totalHeight}
          onClose={handleDrawerClose}
        >
          {children}
        </StyledDrawer>

        <Wrapper>
          {list.map((item) => {
            // LINK INNER CONTENTS
            const ICON = <item.icon sx={iconStyle} fontSize="small" />;

            const CONTENT = (
              <Fragment>
                {item.title === "Cart" ? (
                  <Badge badgeContent={state.cart.length} color="primary">
                    {ICON}
                  </Badge>
                ) : (
                  ICON
                )}

                {item.title}
              </Fragment>
            );

            return item.href ? (
              <StyledNavLink key={item.title} href={item.href}>
                {CONTENT}
              </StyledNavLink>
            ) : (
              <StyledBox key={item.title} onClick={open ? handleDrawerClose : handleDrawerOpen}>
                {CONTENT}
              </StyledBox>
            );
          })}
        </Wrapper>
      </Box>
    );
  }

  return null;
};

const list = [
  { title: "Home", icon: Home, href: "/" },
  { title: "Category", icon: CategoryOutlined },
  { title: "Cart", icon: ShoppingBagOutlined, href: "/cart" },
  { title: "Account", icon: User2, href: "/profile" },
];

export default MobileNavigationBar2;
