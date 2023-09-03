import { FC, Fragment } from "react";
import { Dialog, Drawer, useMediaQuery, Theme } from "@mui/material";
// LOGIN FORM
import { LoginPageView } from "pages-sections/sessions/page-view";
// GLOBAL CUSTOM COMPONENTS
import { MiniCart } from "components/mini-cart";
// LOGIN PAGE SECTIONS
import { Wrapper } from "pages-sections/sessions/styles";
import LogoWithTitle from "pages-sections/sessions/logo-title";
import SocialButtons from "pages-sections/sessions/social-buttons";

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

  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("xs"));

  return (
    <Fragment>
      <Dialog
        scroll="body"
        open={dialogOpen}
        fullWidth={isMobile}
        onClose={toggleDialog}
        sx={{ zIndex: 9999 }}
      >
        <Wrapper>
          <LogoWithTitle />
          <LoginPageView />
          <SocialButtons />
        </Wrapper>
      </Dialog>

      <Drawer open={sidenavOpen} anchor="right" onClose={toggleSidenav} sx={{ zIndex: 9999 }}>
        <MiniCart toggleSidenav={toggleSidenav} />
      </Drawer>
    </Fragment>
  );
};

export default DialogDrawer;
