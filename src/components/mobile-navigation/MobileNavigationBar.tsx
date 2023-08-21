import { Theme, useMediaQuery, Badge } from "@mui/material";
// CUSTOM ICON COMPONENTS
import Home from "icons/Home";
import User2 from "icons/User2";
import CategoryOutlined from "icons/CategoryOutline";
import ShoppingBagOutlined from "icons/ShoppingBagOutlined";
// GLOBAL CUSTOM HOOK
import useCart from "hooks/useCart";
// STYLED COMPONENTS
import { iconStyle, StyledNavLink, Wrapper } from "./styles";

const MobileNavigationBar = () => {
  const { state } = useCart();
  const DOWN_900 = useMediaQuery((theme: Theme) => theme.breakpoints.down(900));

  if (DOWN_900) {
    return (
      <Wrapper>
        {list.map((item) => (
          <StyledNavLink href={item.href} key={item.title}>
            {item.title === "Cart" ? (
              <Badge badgeContent={state.cart.length} color="primary">
                <item.icon fontSize="small" sx={iconStyle} />
              </Badge>
            ) : (
              <item.icon sx={iconStyle} fontSize="small" />
            )}

            {item.title}
          </StyledNavLink>
        ))}
      </Wrapper>
    );
  }

  return null;
};

const list = [
  { title: "Home", icon: Home, href: "/" },
  { title: "Category", icon: CategoryOutlined, href: "/mobile-category-nav" },
  { title: "Cart", icon: ShoppingBagOutlined, href: "/cart" },
  { title: "Account", icon: User2, href: "/profile" },
];

export default MobileNavigationBar;
