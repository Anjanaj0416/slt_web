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
import { H3, Paragraph, Span } from "components/Typography";
// CUSTOM DATA MODEL
import Category1 from "models/Category.model";
import Link from "next/link";

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
    <Box sx={{ mt: { md: 4, xs: 0 }, mb: { md: 8, xs: 5 } }}>
      <H3 sx={{ pb: 2 }}>Categories</H3>
      <Grid
        container
        sx={{ px: 0, mx: 0, display: { md: "flex", xs: "none" } }}
        spacing={3}
      >
        {/* CATEGORY LIST AREA */}
        {categories.slice(0, 6)?.map((item) => (
          <Grid item lg={2} md={3} sm={4} xs={5} key={item.id}>
            <Link href={`/products/search?categoryId=${item.id}_${item.name}`}>
              <CategoryCard1 image={item.imageUrl} title={item.name} />
            </Link>
          </Grid>
        ))}
      </Grid>
      <Grid container sx={{ px: 0, mx: 0 }} spacing={3}>
        {/* CATEGORY LIST AREA */}
        {categories.slice(0, 4)?.map((item) => (
          <Grid
            item
            lg={2}
            md={3}
            sm={4}
            xs={5}
            key={item.id}
            sx={{ display: { md: "none", xs: "flex" } }}
          >
            <Link href={`/products/search?categoryId=${item.id}_${item.name}`}>
              <CategoryCard1 image={item.imageUrl} title={item.name} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AnimatedCategoryList;
