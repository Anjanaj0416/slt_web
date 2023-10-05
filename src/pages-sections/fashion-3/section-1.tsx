"use client";

import { FC } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
// GLOBAL CUSTOM COMPONENTS
import { Carousel } from "components/carousel-2";
import { CarouselCard4 } from "components/carousel-cards";
// CUSTOM DATA MODEL
import { MainCarouselItem } from "models/Market-2.model";

// ======================================================
type Props = { carouselData: MainCarouselItem[] };
// ======================================================

const Section1: FC<Props> = ({ carouselData }) => {
  return (
    <Box pt={3} mb={3}>
      <Container>
        <Carousel
          dots
          arrows={false}
          spaceBetween={0}
          slidesToShow={1}
          dotColor="white"
          dotStyles={{
            left: 0,
            right: 0,
            bottom: 20,
            position: "absolute",
          }}
        >
          {carouselData.map((item, ind) => (
            <CarouselCard4
              key={ind}
              mode="dark"
              title={item.title}
              bgImage={item.imgUrl}
              discount={item.discount}
              category={item.category}
              buttonText={item.buttonText}
              buttonLink={item.buttonLink}
              description={item.description}
            />
          ))}
        </Carousel>
      </Container>
    </Box>
  );
};

export default Section1;
