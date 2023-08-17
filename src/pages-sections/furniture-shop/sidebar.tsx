"use client";

import Box from "@mui/material/Box";
import { useEffect, useRef, useState } from "react";
// Local CUSTOM COMPONENT
import Section2 from "./section-2";
// GLOBAL CUSTOM COMPONENT
import SideNavbar from "components/page-sidenav/SideNavbar";
// CUSTOM DATA MODEL
import CategoryNavList from "models/CategoryNavList.model";
// STYLED COMPONENT
import { StyledContainer } from "./styles";

// ==============================================================
interface Props {
  navList: CategoryNavList[];
}
// ==============================================================

const Sidebar = ({ navList }: Props) => {
  const pageContentRef = useRef<HTMLElement>();
  const [sidebarHeight, setSidebarHeight] = useState(0);

  useEffect(() => setSidebarHeight(pageContentRef.current.offsetHeight), []);

  return (
    <StyledContainer>
      {/* LEFT SIDEBAR */}
      <Box className="sidenav">
        <SideNavbar
          lineStyle="dash"
          navList={navList}
          sidebarStyle="style2"
          sidebarHeight={sidebarHeight || "85vh"}
        />
      </Box>

      {/* OFFER BANNERS */}
      <Box className="pageContent" ref={pageContentRef}>
        <Section2 />
      </Box>
    </StyledContainer>
  );
};

export default Sidebar;
