import Link from "next/link";
import { FC, Fragment, ReactElement } from "react";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
// MUI ICON COMPONENT
import Clear from "@mui/icons-material/Clear";
// CUSTOM ICON COMPONENTS
import Icon from "icons";
// LOCAL CUSTOM COMPONENTS
import DialogDrawer from "./dialog-drawer";
// GLOBAL CUSTOM COMPONENTS
import Image from "components/BazaarImage";
import { Paragraph } from "components/Typography";
import { MobileMenu } from "components/navbar/mobile-menu";
import { FlexBetween, FlexBox } from "components/flex-box";
// GLOBAL CUSTOM HOOK
import useCart from "hooks/useCart";
// LOCAL CUSTOM HOOK
import useHeader from "./use-header";
import { signIn, useSession } from "next-auth/react";
import { User1 } from "models/User.model";
import { AccountPopover } from "components/layouts/customer-dashboard";
import useCartService from "hooks/useCartService";

// ==============================================================
interface Props {
  searchInput: ReactElement;
  dialogOpen: boolean;
  sidenavOpen: boolean;
  searchBarOpen: boolean;
  toggleDialog: () => void;
  toggleSearchBar: () => void;
  toggleSidenav: () => void;
}
// ==============================================================

const MobileHeader: FC<Props> = ({
  searchInput,
  dialogOpen,
  sidenavOpen,
  searchBarOpen,
  toggleDialog,
  toggleSearchBar,
  toggleSidenav,
}) => {
  const { length } = useCartService();
  const session = useSession();
  const user = session?.data?.user as User1;
  const ICON_STYLE = { color: "grey.600", fontSize: 20 };

  return (
    <Fragment>
      <FlexBetween width="100%">
        {/* LEFT CONTENT - NAVIGATION ICON BUTTON */}
        <Box flex={1}>
          <MobileMenu />
        </Box>

        {/* MIDDLE CONTENT - LOGO */}
        <Link href="/">
          <Image
            height={70}
            src="/assets/images/bazaar-black-sm.svg"
            alt="logo"
          />
        </Link>

        {/* RIGHT CONTENT - LOGIN, CART, SEARCH BUTTON */}
        <FlexBox justifyContent="end" flex={1}>
          <Box component={IconButton} onClick={toggleSearchBar}>
            <Icon.Search sx={ICON_STYLE} />
          </Box>
          <Box component={IconButton} onClick={toggleSidenav}>
            <Badge badgeContent={length} color="primary">
              <Icon.CartBag sx={ICON_STYLE} />
            </Badge>
          </Box>
          <Box component={IconButton}>
            {user ? (
              <AccountPopover isMobile={true} />
            ) : (
              <IconButton
                onClick={() =>
                  void signIn("keycloak", { callbackUrl: window.location.href || "/" })
                }
              >
                <Icon.User sx={ICON_STYLE} />
              </IconButton>
            )}
          </Box>
        </FlexBox>
      </FlexBetween>

      {/* SEARCH FORM DRAWER */}
      <Drawer
        open={searchBarOpen}
        anchor="top"
        onClose={toggleSearchBar}
        sx={{ zIndex: 9999 }}
      >
        <Box sx={{ width: "auto", padding: 2, height: "100vh" }}>
          <FlexBetween mb={1}>
            <Paragraph>Search to TRADEZ</Paragraph>

            <IconButton onClick={toggleSearchBar}>
              <Clear />
            </IconButton>
          </FlexBetween>

          {/* CATEGORY BASED SEARCH FORM */}
          {searchInput}
        </Box>
      </Drawer>

      {/* LOGIN FORM DIALOG AND CART SIDE BAR  */}
      <DialogDrawer
        dialogOpen={dialogOpen}
        sidenavOpen={sidenavOpen}
        toggleDialog={toggleDialog}
        toggleSidenav={toggleSidenav}
      />
    </Fragment>
  );
};

export default MobileHeader;
