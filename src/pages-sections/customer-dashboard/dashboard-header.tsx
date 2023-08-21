import { FC } from "react";
import { SvgIconComponent, Menu } from "@mui/icons-material";
import { Box, Theme, styled, useMediaQuery } from "@mui/material";
// GLOBAL CUSTOM COMPONENTS
import Sidenav from "components/Sidenav";
import { H2 } from "components/Typography";
import { FlexBox } from "components/flex-box";

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
interface Props {
  title: string;
  button?: JSX.Element;
  navigation: JSX.Element;
  Icon?: SvgIconComponent;
}
// ==============================================================

const DashboardHeader: FC<Props> = ({ title, button, navigation, Icon }) => {
  const isTablet = useMediaQuery((theme: Theme) => theme.breakpoints.down(1025));

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
            {navigation}
          </Sidenav>
        </Box>

        {!isTablet && button ? button : null}
      </FlexBox>

      {isTablet && button ? <Box mt={2}>{button}</Box> : null}
    </StyledBox>
  );
};

export default DashboardHeader;
