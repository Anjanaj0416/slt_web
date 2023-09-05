"use client";

import { FC } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
// Local CUSTOM COMPONENTS
import Card1 from "./common/card-1";
import ProductCarousel from "./common/product-carousel";
// GLOBAL CUSTOM COMPONENTS
import { Carousel } from "components/carousel";
import { CarouselCard3 } from "components/carousel-cards";
import { SectionCreator } from "components/section-header";
// GLOBAL CUSTOM HOOK
import useSettings from "hooks/useSettings";
// CUSTOM DATA MODEL
import Product from "models/Product.model";

// =================================================================
type Props = { topPickList: Product[]; mainCarousel: Product[] };
// =================================================================

const Section1: FC<Props> = ({ topPickList, mainCarousel }) => {
  const { settings } = useSettings();

  const ARROW_BUTTON_STYLE = {
    boxShadow: "none",
    color: "#7D879C",
    background: "transparent",
  };

  // dynamically change arrow icon
  const left = settings.direction === "ltr" ? "left" : "right";
  const right = settings.direction === "ltr" ? "right" : "left";

  return (
    <Container sx={{ pt: 6 }}>
      <Grid container spacing={5}>
        <Grid item md={5} xs={12}>
          <Carousel
            visibleSlides={1}
            totalSlides={mainCarousel.length}
            leftButtonStyle={{ ...ARROW_BUTTON_STYLE, [left]: 8 }}
            rightButtonStyle={{ ...ARROW_BUTTON_STYLE, [right]: 8 }}
          >
            {mainCarousel.map((product) => (
              <CarouselCard3 product={product} key={product.id} />
            ))}
          </Carousel>
        </Grid>

        <Grid item md={7} xs={12}>
          <SectionCreator title="Top Picks">
            {/* TOP PICK LIST PRODUCT */}
            <ProductCarousel products={topPickList} />

            {/* MIDDLE BANNER AREA */}
            <Box my="3rem">
              <Card1
                title="Converse Collections"
                body="Get the most exciting deals. Starting at $59"
                imgUrl="/assets/images/products/red-shoe.png"
              />
            </Box>

            {/* BOTTOM PICK LIST PRODUCT */}
            <ProductCarousel products={topPickList} />
          </SectionCreator>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Section1;
