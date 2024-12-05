"use client";

import { usePathname } from "next/navigation";
import { Fragment, useContext } from "react";
// MUI ICON COMPONENTS
import Place from "@mui/icons-material/Place";
import Person from "@mui/icons-material/Person";
import CreditCard from "@mui/icons-material/CreditCard";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ShoppingBagOutlined from "@mui/icons-material/ShoppingBagOutlined";
// GLOBAL CUSTOM COMPONENTS
import { FlexBox } from "components/flex-box";
import { Paragraph, Span } from "components/Typography";
// CUSTOM ICON COMPONENT
import CustomerService from "icons/CustomerService";
// STYLED COMPONENTS
import { MainContainer, StyledNavLink } from "./styles";
import { WishlistContext } from "contexts/WishlistContext";

type NavigationProps = {
  ordersCount?: number;
};
const Navigation = ({ ordersCount }: NavigationProps) => {
  const pathname = usePathname();
  const { wishlist } = useContext(WishlistContext);
  return (
    <MainContainer>
      {MENUS.map((item) => (
        <Fragment key={item.title}>
          <Paragraph p="26px 30px 1rem" color="grey.600" fontSize={12}>
            {item.title}
          </Paragraph>

          {item.list.map(({ Icon, count, href, title }) => {
            if (title === "Wishlist") {
              count = wishlist.products.length;
            } else if (title === "Orders") {
              count = ordersCount
                ? ordersCount < 100
                  ? ordersCount
                  : "99+"
                : "";
            }
            return (
              <StyledNavLink
                href={href}
                key={title}
                isCurrentPath={pathname.includes(href)}
              >
                <FlexBox alignItems="center" gap={1}>
                  <Icon color="inherit" fontSize="small" className="nav-icon" />
                  <Span>{title}</Span>
                </FlexBox>

                {count ? <Span>{count}</Span> : <Span></Span>}
              </StyledNavLink>
            );
          })}
        </Fragment>
      ))}
    </MainContainer>
  );
};

const MENUS = [
  {
    title: "DASHBOARD",
    list: [
      {
        href: "/orders",
        title: "Orders",
        Icon: ShoppingBagOutlined,
        count: "100",
      },
      {
        href: "/wish-list",
        title: "Wishlist",
        Icon: FavoriteBorder,
        count: "19",
      },
      {
        href: "/support-tickets",
        title: "Support Tickets",
        Icon: CustomerService,
        count: 0,
      },
    ],
  },
  {
    title: "ACCOUNT SETTINGS",
    list: [
      { href: "/profile", title: "Profile Info", Icon: Person },
      { href: "/address", title: "Addresses", Icon: Place},
      // {
      //   href: "/payment-methods",
      //   title: "Payment Methods",
      //   Icon: CreditCard,
     
      // },
    ],
  },
];

export default Navigation;
