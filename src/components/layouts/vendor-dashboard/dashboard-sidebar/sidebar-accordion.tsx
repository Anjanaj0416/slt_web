import { FC, PropsWithChildren, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Box, Collapse, styled } from "@mui/material";
// LOCAL CUSTOM HOOK
import { useLayout } from "../dashboard-layout-context";
// STYLED COMPONENTS
import {
  BadgeValue,
  BulletIcon,
  StyledText,
  NavItemButton,
  ListIconWrapper,
  ChevronRightIcon,
} from "./styles";

// STYLED COMPONENT
const NavExpandRoot = styled(Box)({
  "& .subMenu": { padding: 0 },
  "& .navItem": { background: "transparent" },
  "& .expansion-panel": {
    "& .expansion-panel": { paddingLeft: 8 },
    overflow: "hidden",
    transition: "max-height 0.3s cubic-bezier(0, 0, 0.2, 1)",
  },
});

// ================================================================
interface Props extends PropsWithChildren {
  item: any;
}
// ================================================================

const SidebarAccordion: FC<Props> = ({ item, children }) => {
  const { name, icon, iconText, badge } = item || {};

  const { COMPACT } = useLayout();
  const pathname = usePathname();
  const [hasActive, setHasActive] = useState(0);
  const [collapsed, setCollapsed] = useState(false);

  const handleClick = () => setCollapsed((state) => !state);

  const find = item?.children?.find((li: any) => li.path === pathname);

  useEffect(() => {
    if (find) {
      setCollapsed(true);
      setHasActive(1);
    }

    if (COMPACT) {
      setCollapsed(false);
    }

    return () => {
      setCollapsed(false);
      setHasActive(0);
    };
  }, [find, COMPACT]);

  return (
    <NavExpandRoot className="subMenu">
      <NavItemButton
        active={hasActive}
        onClick={handleClick}
        sx={{ justifyContent: "space-between" }}
      >
        <Box display="flex" alignItems="center">
          {icon ? (
            <ListIconWrapper>
              <item.icon />
            </ListIconWrapper>
          ) : null}

          {iconText ? <BulletIcon active={hasActive} /> : null}

          <StyledText compact={COMPACT}>{name}</StyledText>
        </Box>

        {badge ? (
          <BadgeValue compact={COMPACT} className="itemIcon">
            {badge.value}
          </BadgeValue>
        ) : null}

        <ChevronRightIcon
          color="disabled"
          compact={COMPACT}
          className="accordionArrow"
          collapsed={collapsed ? 1 : 0}
        />
      </NavItemButton>

      <Collapse in={collapsed} unmountOnExit>
        <Box className="expansion-panel">{children}</Box>
      </Collapse>
    </NavExpandRoot>
  );
};

export default SidebarAccordion;
