"use client";

import { FC, PropsWithChildren, useEffect, useRef, useState } from "react";
import { Box, Container, styled } from "@mui/material";
// CUSTOM UTILS LIBRARY FUNCTION
import { layoutConstant } from "utils/constants";
// GLOBAL CUSTOM COMPONENTS
import SideNavbar from "components/page-sidenav/SideNavbar";
// CUSTOM DATA MODEL
import CategoryNavList from "models/CategoryNavList.model";

// STYLED COMPONENT
const StyledContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  marginBottom: "2rem",
  ".sidenav": {
    top: 0,
    bottom: 0,
    position: "relative",
    transition: "all 350ms ease-in-out",
    width: layoutConstant.grocerySidenavWidth,
    minWidth: layoutConstant.grocerySidenavWidth,
    "& .MuiPaper-root": { borderRadius: 0 },
    [theme.breakpoints.down("md")]: { display: "none" },
  },
  ".pageContent": {
    left: "unset",
    position: "relative",
    marginLeft: "1.75rem",
    width: `calc(100% - 2.5rem - ${layoutConstant.grocerySidenavWidth}px)`,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      "& .MuiGrid-item": { paddingLeft: 0 },
      "& .categories": { marginLeft: "-1.75rem" },
    },
  },
}));

// ==============================================================
interface Props extends PropsWithChildren {
  navList: CategoryNavList[];
}
// ==============================================================

const Sidebar: FC<Props> = ({ children, navList }) => {
  const pageContentRef = useRef<HTMLElement>();
  const [sidebarHeight, setSidebarHeight] = useState(0);

  useEffect(() => setSidebarHeight(pageContentRef.current.offsetHeight), []);

  return (
    <StyledContainer>
      {/* SIDE NAV BAR */}
      <Box className="sidenav">
        <SideNavbar
          lineStyle="dash"
          navList={navList}
          sidebarStyle="style2"
          sidebarHeight={sidebarHeight || "85vh"}
        />
      </Box>

      <Box className="pageContent" ref={pageContentRef}>
        {children}
      </Box>
    </StyledContainer>
  );
};

export default Sidebar;
