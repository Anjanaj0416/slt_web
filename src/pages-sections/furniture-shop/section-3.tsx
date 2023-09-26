"use client";

import { FC, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
// GLOBAL CUSTOM HOOKS
import useWindowSize from "hooks/useWindowSize";
// GLOBAL CUSTOM COMPONENTS
import { Carousel } from "components/carousel";
import { H1, Paragraph } from "components/Typography";
import { ProductCard7 } from "components/product-cards/product-card-7";
// CUSTOM DATA MODEL
import Product from "models/Product.model";

// ====================================================
interface Props {
  heading: string;
  description: string;
  products: Product[];
}
// ====================================================

const Section3: FC<Props> = ({ products, heading, description }) => {
  const theme = useTheme();
  const width = useWindowSize();
  const [visibleSlides, setVisibleSlides] = useState(3);

  useEffect(() => {
    if (width < 500) setVisibleSlides(1);
    else if (width < 650) setVisibleSlides(2);
    else if (width < 950) setVisibleSlides(3);
    else setVisibleSlides(3);
  }, [width]);

  const CAROUSEL_STYLE = {
    "& #backArrowButton, #backForwardButton": {
      width: 40,
      height: 40,
      borderRadius: 0,
      boxShadow: theme.shadows[2],
      color: theme.palette.primary.main,
      background: theme.palette.primary[50],
      "&:hover": { background: theme.palette.primary[100] },
    },
  };

  return (
    <div>
      <Box my={2}>
        <H1 mb="4px">{heading}</H1>
        <Paragraph color="grey.600">{description}</Paragraph>
      </Box>

      <Carousel
        totalSlides={products.length}
        visibleSlides={visibleSlides}
        infinite={true}
        sx={CAROUSEL_STYLE}
      >
        {products.map((item) => (
          <Box py={2} key={item.id}>
            <ProductCard7
              hideRating
              id={item.id}
              slug={item.slug}
              title={item.title}
              price={item.price}
              off={item.discount}
              rating={item.rating}
              status={item.status}
              imgUrl={item.thumbnail}
              productColors={item.colors}
            />
          </Box>
        ))}
      </Carousel>
    </div>
  );
};

export default Section3;
