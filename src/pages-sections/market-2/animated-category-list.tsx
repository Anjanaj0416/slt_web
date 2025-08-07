"use client";

import { FC } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { keyframes, styled } from "@mui/material/styles";
// GLOBAL CUSTOM COMPONENTS
import { FlexBox } from "components/flex-box";
import WhiteButton from "components/WhiteButton";
import { CategoryCard1 } from "components/category-cards";
import { H2, H3, Paragraph, Span } from "components/Typography";
// CUSTOM DATA MODEL
import Category1 from "models/Category.model";

// CSS ANIMATION NAME
const slideX = keyframes`
    from { left: 120% }
    to { left: -100% }
`;

// STYLED COMPONENTS
const AdWrapper = styled(FlexBox)(({ theme }) => ({
  color: "#fff",
  marginTop: "3rem",
  overflow: "hidden",
  backgroundColor: "#434343",
  position: "relative",
  "::before": {
    inset: 5,
    zIndex: 3,
    content: "''",
    position: "absolute",
    border: "1px dashed #fff",
  },
  [theme.breakpoints.down("sm")]: { flexDirection: "column" },
}));

const AdTitle1 = styled(H3)(({ theme }) => ({
  zIndex: 10,
  fontSize: 27,
  padding: "1.5rem",
  position: "relative",
  backgroundColor: "#e0e0e0",
  textTransform: "uppercase",
  color: theme.palette.dark.main,
  "::after": {
    top: theme.direction === "rtl" ? -16 : -36,
    bottom: 0,
    zIndex: -1,
    right: -17,
    content: "''",
    position: "absolute",
    transform: "rotate(23deg)",
    border: "70px solid #e0e0e0",
  },
  [theme.breakpoints.down("sm")]: {
    marginBottom: 16,
    "::after": { display: "none" },
  },
}));

// ===========================================================
type Props = { categories: Category1[] };
// ===========================================================

const AnimatedCategoryList: FC<Props> = ({ categories }) => {
  return (
    <Box sx={{ mt: { xs: 0, md: 6 } }}>
      <H3>Categories</H3>

      {/* Mobile view */}
      <Box
        width="100%"
        height={100}
        gap={2}
        sx={{ display: { md: "none", xs: "flex" }, mt: 1, overflowX: "auto" }}
      >
        {categories
          .slice(0, 4)
          ?.map((item) => (
            <CategoryCard1
              key={item.id}
              image={item.imageUrl}
              title={item.name}
            />
          ))}
      </Box>

      {/* Desktop view with horizontal scroll */}
      <Box
        sx={{
          display: { md: "block", xs: "none" },
          mt: 0.2,
          overflowX: "auto", // enables horizontal scrolling
          whiteSpace: "nowrap", // prevents wrapping
          pb: 1, // optional padding-bottom for scrollbar spacing
        }}
      >
        <Box
          sx={{
            display: "inline-flex", // keep children in a row without wrapping
            gap: 3,
          }}
        >
          {categories?.slice(0,5).map((item) => (
            <Box
              key={item.id}
              sx={{
                minWidth: 200, // fixed min width so cards don't shrink too much
                display: "inline-block",
              }}
            >
              <CategoryCard1 image={item.imageUrl} title={item.name} />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default AnimatedCategoryList;
