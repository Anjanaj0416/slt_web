import { FC } from "react";
import Link from "next/link";
import { SvgIconComponent, Menu } from "@mui/icons-material";
import { Box, Button, Theme, styled, useMediaQuery } from "@mui/material";
// GLOBAL CUSTOM COMPONENTS
import Sidenav from "components/Sidenav";
import { H2 } from "components/Typography";
import FlexBox from "components/flex-box/FlexBox";
import { Navigation } from "components/layouts/customer-dashboard-layout";

// STYLED COMPONENT
const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  marginTop: theme.spacing(-2),
  marginBottom: theme.spacing(3),
  "& .headerHold": {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  [theme.breakpoints.up("md")]: {
    "& .sidenav": { display: "none" },
  },
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

// ==============================================================

type WithButton = {
  href: string;
  title: string;
  buttonText: string;
  Icon: SvgIconComponent;
};

type WithoutButton = {
  title: string;
  Icon: SvgIconComponent;
  href?: never;
  buttonText?: never;
};

type Props = WithoutButton | WithButton;
// ==============================================================

const DashboardHeader: FC<Props> = ({ title, buttonText, href, Icon }) => {
  const isTablet = useMediaQuery((theme: Theme) => theme.breakpoints.down(1025));

  const HEADER_LINK = (
    <Button
      href={href}
      color="primary"
      LinkComponent={Link}
      sx={{ bgcolor: "primary.light", px: 4 }}
    >
      {buttonText}
    </Button>
  );

  return (
    <StyledBox>
      <FlexBox mt={2} className="headerHold">
        <FlexBox alignItems="center" gap={1.5}>
          {Icon && <Icon color="primary" />}

          <H2 my={0} lineHeight={1} ellipsis>
            {title}
          </H2>
        </FlexBox>

        <Box className="sidenav">
          <Sidenav position="left" handle={<Menu fontSize="small" />}>
            <Navigation />
          </Sidenav>
        </Box>

        {!isTablet && buttonText ? HEADER_LINK : null}
      </FlexBox>

      {isTablet && buttonText ? <Box mt={2}>{HEADER_LINK}</Box> : null}
    </StyledBox>
  );
};

export default DashboardHeader;
