import { FC, Fragment } from "react";
import Drawer from "@mui/material/Drawer";
import { Theme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
// GLOBAL CUSTOM COMPONENTS
import { MiniCart } from "components/mini-cart";

// ==============================================================
interface Props {
  dialogOpen: boolean;
  sidenavOpen: boolean;
  toggleDialog: () => void;
  toggleSidenav: () => void;
}
// ==============================================================

const DialogDrawer: FC<Props> = (props) => {
  const { dialogOpen, sidenavOpen, toggleDialog, toggleSidenav } = props;

  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("xs")
  );

  return (
    <Fragment>
      {/* <Dialog
        scroll="body"
        open={dialogOpen}
        fullWidth={isMobile}
        onClose={toggleDialog}
        sx={{ zIndex: 9999 }}
      >
        <Wrapper>
          <LogoWithTitle />
          <LoginPageView closeDialog={toggleDialog} />
          <SocialButtons />
          <LoginBottom />
        </Wrapper>
      </Dialog> */}

      <Drawer
        open={sidenavOpen}
        anchor="right"
        onClose={toggleSidenav}
        sx={{ zIndex: 9999 }}
      >
        <MiniCart toggleSidenav={toggleSidenav} />
      </Drawer>
    </Fragment>
  );
};

export default DialogDrawer;
