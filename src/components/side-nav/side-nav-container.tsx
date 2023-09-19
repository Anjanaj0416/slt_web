import { FC, ReactNode, useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import clsx from "clsx";
import { layoutConstant } from "utils/constants";
// STYLED COMPONENT
import { StyledContainer } from "./styles";

// ================================================================
interface Props {
  children: ReactNode;
  SideNav: () => JSX.Element;
  navFixedComponentID: string;
}
// ================================================================

const SideNavContainer: FC<Props> = (props) => {
  const { SideNav, children, navFixedComponentID } = props;

  const [isFixed, setFixed] = useState(false);

  const scrollListener = useCallback(() => {
    const element = document.getElementById(navFixedComponentID)!;
    const elementBottom = element.getBoundingClientRect().bottom;

    const position = elementBottom + window.scrollY - layoutConstant.headerHeight;
    setFixed(window.scrollY > position);
  }, [navFixedComponentID]);

  useEffect(() => {
    window.addEventListener("scroll", scrollListener);
    return () => window.removeEventListener("scroll", scrollListener);
  }, [scrollListener]);

  return (
    <StyledContainer>
      <Box className={clsx({ sidenav: true, fixed: isFixed })}>
        <SideNav />
      </Box>

      <Box className={clsx({ pageContent: true, pageContentLeft: isFixed })}>{children}</Box>
    </StyledContainer>
  );
};

export default SideNavContainer;
