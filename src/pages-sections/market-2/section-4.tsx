"use client";

import { FC } from "react";
// GLOBAL CUSTOM COMPONENTS
import { H3 } from "components/Typography";
import { Carousel } from "components/carousel";
import { FlexBetween } from "components/flex-box";
import { ProductCard10 } from "components/product-cards/product-card-10";
// CUSTOM DATA MODEL
import { Product1 } from "models/Product.model";
import { Box } from "@mui/material";

// ======================================================================
type Props = { products: Product1[] };
// ======================================================================

const Section4: FC<Props> = ({ products }) => {
  const responsive = [
    { breakpoint: 1200, settings: { slidesToShow: 4 } },
    { breakpoint: 1024, settings: { slidesToShow: 3 } },
    { breakpoint: 650, settings: { slidesToShow: 2 } },
    { breakpoint: 426, settings: { slidesToShow: 1 } },
  ];

  return (
    <Box sx={{ pb: 3, pt: -4 }}>
      <FlexBetween mb={2}>
        <H3>Deals Of The Day</H3>
        {/* <NavLink3 text="More Products" href="/" hoverColor="dark.main" /> */}
      </FlexBetween>

      <Carousel
        slidesToShow={5}
        responsive={responsive}
        arrowStyles={{ backgroundColor: "dark.main" }}
      >
        {products?.map((product) => (
          <ProductCard10 product={product} key={product.id} />
        ))}
      </Carousel>
    </Box>
  );
};

export default Section4;
