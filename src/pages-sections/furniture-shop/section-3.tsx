"use client";

import { FC } from "react";
import Box from "@mui/material/Box";
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
  const responsive = [
    { breakpoint: 650, settings: { slidesToShow: 2 } },
    { breakpoint: 500, settings: { slidesToShow: 1 } },
  ];

  return (
    <div>
      <Box my={2}>
        <H1 mb="4px">{heading}</H1>
        <Paragraph color="grey.600">{description}</Paragraph>
      </Box>

      <Carousel
        responsive={responsive}
        slidesToShow={3}
        arrowStyles={{
          width: 40,
          height: 40,
          boxShadow: 2,
          borderRadius: 0,
          color: "primary.main",
          backgroundColor: "primary.50",
          "&:hover": { backgroundColor: "primary.100" },
        }}
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
