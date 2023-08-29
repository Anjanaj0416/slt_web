"use client";

import { FC } from "react";
import Box from "@mui/material/Box";
// CUSTOM ICON COMPONENTS
import appIcons from "icons";
// GLOBAL CUSTOM COMPONENTS
import Scrollbar from "components/Scrollbar";
import { Span } from "components/Typography";
import { FlexBox } from "components/flex-box";
import { Accordion, AccordionHeader } from "components/accordion";
// LOCAL CUSTOM COMPONENTS
import { renderChild } from "./render-child";
import CategoryTitle from "./category-title";
// STYLED COMPONENTS
import { NavbarRoot } from "./styles";
// CUSTOM DATA MODEL
import CategoryNavList from "models/CategoryNavList.model";

// ==================================================================
interface Props {
  isFixed?: boolean;
  navList: CategoryNavList[];
  lineStyle?: "dash" | "solid";
  sidebarHeight?: string | number;
  sidebarStyle?: "style1" | "style2";
  handleSelect?: (category: string) => void;
}

// ==================================================================

const SideNavbar: FC<Props> = (props) => {
  const {
    isFixed,
    navList,
    lineStyle = "solid",
    sidebarHeight = "auto",
    sidebarStyle = "style1",
    handleSelect = () => {},
  } = props;

  return (
    <Scrollbar autoHide={false} sx={{ maxHeight: sidebarHeight }}>
      <NavbarRoot fixed={isFixed} sidebar={sidebarStyle}>
        {navList.map((item, ind) => {
          return (
            <Box key={ind}>
              <CategoryTitle title={item.category} line={lineStyle} />

              {item.categoryItem.map((item, ind) => {
                const Icon = appIcons[item.icon];

                return (
                  <Box mb="2px" color="grey.700" key={ind}>
                    {item.child ? (
                      <Accordion>
                        {/* ACCORDION / COLLAPSE HEADER */}
                        <AccordionHeader
                          px={0}
                          py={0.75}
                          className="linkList"
                          sx={{ ":hover": { color: "primary.main" } }}
                        >
                          <FlexBox gap={1.5} alignItems="center">
                            <Icon fontSize="small" />
                            <Span fontWeight="600">{item.title}</Span>
                          </FlexBox>
                        </AccordionHeader>

                        {/* RENDER NESTED NAV ITEMS */}
                        {item.child ? renderChild(item.child, handleSelect) : null}
                      </Accordion>
                    ) : (
                      <Box
                        key={item.title}
                        onClick={() => handleSelect(item.title)}
                        sx={{ color: "grey.700", cursor: "pointer" }}
                      >
                        <FlexBox gap={1.5} className="linkList" py={0.75}>
                          <Icon fontSize="small" />
                          <Span fontWeight="600">{item.title}</Span>
                        </FlexBox>
                      </Box>
                    )}
                  </Box>
                );
              })}
            </Box>
          );
        })}
      </NavbarRoot>
    </Scrollbar>
  );
};

export default SideNavbar;
