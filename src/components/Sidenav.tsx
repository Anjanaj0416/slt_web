import { cloneElement, FC, useEffect, useState, ReactNode } from "react";
import clsx from "clsx";
import { Box, Drawer, styled } from "@mui/material";
// GLOBAL CUSTOM COMPONENT
import Scrollbar from "components/Scrollbar";

// styled component
const Wrapper = styled(Box)({ "& .handle": { cursor: "pointer" } });

// ================================================================
type SidenavProps = {
  open?: boolean;
  width?: number;
  children: ReactNode;
  handle: React.ReactElement;
  toggleSidenav?: () => void;
  position?: "left" | "right";
};
// ================================================================

const Sidenav: FC<SidenavProps> = (props) => {
  const { position = "left", open = false, width = 280, handle, children, toggleSidenav } = props;

  const [sidenavOpen, setSidenavOpen] = useState(open);
  const handleToggleSidenav = () => setSidenavOpen(!sidenavOpen);

  useEffect(() => setSidenavOpen(open), [open]);

  return (
    <Wrapper>
      <Drawer
        anchor={position}
        open={sidenavOpen}
        onClose={toggleSidenav || handleToggleSidenav}
        SlideProps={{ style: { width } }}
        sx={{ zIndex: 15001 }}
      >
        <Scrollbar autoHide={false}>{children}</Scrollbar>
      </Drawer>

      {handle &&
        cloneElement(handle, {
          onClick: toggleSidenav || handleToggleSidenav,
          className: clsx(handle.props?.className, "handle"),
        })}
    </Wrapper>
  );
};

export default Sidenav;
