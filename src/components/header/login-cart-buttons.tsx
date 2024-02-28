"use client";

import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { FC } from "react";
// MUI ICON COMPONENT
import PersonOutline from "@mui/icons-material/PersonOutline";
// GLOBAL CUSTOM COMPONENT
import { FlexBox } from "components/flex-box";
// CUSTOM ICON COMPONENT
import ShoppingBagOutlined from "icons/ShoppingBagOutlined";
// GLOBAL CUSTOM HOOK
import useCartService from "hooks/useCartService";
import AccountPopover from "components/layouts/vendor-dashboard/dashboard-navbar/account-popover";
import { useSession } from "next-auth/react";
import { User1 } from "models/User.model";

// ==============================================================
interface Props {
  toggleDialog: () => void;
  toggleSidenav: () => void;
}
// ==============================================================

const LoginCartButtons: FC<Props> = ({ toggleDialog, toggleSidenav }) => {
  const { length } = useCartService();

  const session = useSession();

  const user = session?.data?.user as User1;

  return (
    <FlexBox gap={1.5} alignItems="center">
      {user ? (
        <AccountPopover />
      ) : (
        <Box
          p={1.25}
          bgcolor="grey.200"
          component={IconButton}
          onClick={toggleDialog}
        >
          <PersonOutline />
        </Box>
      )}

      <Badge badgeContent={length} color="primary">
        <Box
          p={1.25}
          bgcolor="grey.200"
          component={IconButton}
          onClick={toggleSidenav}
        >
          <ShoppingBagOutlined />
        </Box>
      </Badge>
    </FlexBox>
  );
};

export default LoginCartButtons;
