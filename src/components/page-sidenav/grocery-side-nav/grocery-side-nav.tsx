import { FC } from "react";
import Box from "@mui/material/Box";
import appIcons from "icons";
// GLOBAL CUSTOM COMPONENTS
import { Span } from "components/Typography";
import { FlexBox } from "components/flex-box";
import { NavLink } from "components/nav-link";
import { Accordion, AccordionHeader } from "components/accordion";
import { renderChild } from "./render-child";
// GLOBAL CUSTOM HOOK
import useScroll from "./use-scroll";
// STYLED COMPONENTS
import { StyledCard, StyledScrollbar } from "./styles";
// CUSTOM DATA MODEL
import { CategoryItem } from "models/CategoryNavList.model";

// ===========================================================
type Props = { navigation: CategoryItem[] };
// ===========================================================

const Grocery2SideNav: FC<Props> = ({ navigation }) => {
  const { scrolled } = useScroll();

  return (
    <StyledScrollbar scrolled={scrolled ? 1 : 0}>
      <StyledCard elevation={3}>
        {navigation.map((item, ind) => {
          const Icon = appIcons[item.icon];

          return (
            <Box mb={1} color="grey.700" key={ind}>
              {item.child ? (
                <Accordion expanded>
                  <AccordionHeader px={0} py={0.75}>
                    <FlexBox gap={1.5} alignItems="center">
                      <Icon fontSize="small" />
                      <Span fontWeight={600}>{item.title}</Span>
                    </FlexBox>
                  </AccordionHeader>

                  {/* RENDER NESTED ITEMS */}
                  {item.child ? renderChild(item.child) : null}
                </Accordion>
              ) : (
                <NavLink key={item.title} href={item.href} color="grey.700">
                  <FlexBox py={0.75} gap={1.5}>
                    <Icon fontSize="small" />
                    <Span fontWeight={600}>{item.title}</Span>
                  </FlexBox>
                </NavLink>
              )}
            </Box>
          );
        })}
      </StyledCard>
    </StyledScrollbar>
  );
};

export default Grocery2SideNav;
