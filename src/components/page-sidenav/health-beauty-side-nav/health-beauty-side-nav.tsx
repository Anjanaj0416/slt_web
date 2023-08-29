import { FC } from "react";
import Box from "@mui/material/Box";
// CUSTOM ICON COMPONENTS
import appIcons from "icons";
// GLOBAL CUSTOM COMPONENTS
import Scrollbar from "components/Scrollbar";
import { FlexBox } from "components/flex-box";
import { NavLink } from "components/nav-link";
import { H4, Span } from "components/Typography";
import { Accordion, AccordionHeader } from "components/accordion";
// RENDER NESTED ITEMS FUNCTION
import { renderChild } from "./render-child";
// styled components
import { NavbarRoot } from "./styles";
// CUSTOM DATA MODEL
import { CategoryItem } from "models/CategoryNavList.model";

// =================================================================
type Props = { navigation: CategoryItem[] };
// =================================================================

const HealthBeautySideNav: FC<Props> = ({ navigation }) => {
  const STYLES = {
    backgroundColor: "primary.200",
    borderRadius: "5px 5px 0px 0px",
  };

  return (
    <Scrollbar>
      <NavbarRoot>
        <FlexBox padding="10px 18px" sx={STYLES}>
          <H4>Categories</H4>
        </FlexBox>

        {navigation.map((item, ind) => {
          const Icon = appIcons[item.icon];

          return (
            <Box mb="2px" color="grey.700" key={ind}>
              {item.child ? (
                <Accordion>
                  {/* ACCORDION / COLLAPSE HEADER */}
                  <AccordionHeader px={0} py={0.75} className="linkList">
                    <FlexBox py={0.3} gap={1.5} alignItems="center">
                      <Icon fontSize="small" />
                      <Span fontWeight={600}>{item.title}</Span>
                    </FlexBox>
                  </AccordionHeader>

                  {/* RENDER NESTED NAV ITEMS */}
                  {item.child ? renderChild(item.child) : null}
                </Accordion>
              ) : (
                <NavLink key={item.title} href={item.href} color="grey.700">
                  <FlexBox className="linkList" py={0.75} gap={1.5}>
                    <Icon fontSize="small" />
                    <Span fontWeight={600}>{item.title}</Span>
                  </FlexBox>
                </NavLink>
              )}
            </Box>
          );
        })}
      </NavbarRoot>
    </Scrollbar>
  );
};

export default HealthBeautySideNav;
