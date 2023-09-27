"use client";

import { FC } from "react";
import { Box, useTheme } from "@mui/material";
// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
import { Carousel } from "components/carousel";
import { H1, Paragraph } from "components/Typography";
// CUSTOM DATA MODEL
import { GiftCarouselItem } from "models/Carousel.model";
// STYLED COMPONENTS
import { StyledBox, StyledGrid, GridItemOne, GridItemTwo, CarouselButton } from "./styles";

// ==========================================================
type Props = { carouselData: GiftCarouselItem[] };
// ==========================================================

const Section1: FC<Props> = ({ carouselData }) => {
  const { palette } = useTheme();

  return (
    <StyledBox id="carouselBox">
      <Carousel
        spacing="0px"
        showDots={true}
        autoPlay={false}
        visibleSlides={1}
        showArrow={false}
        dotClass="carousel-dot"
        dotColor={palette.primary.main}
        totalSlides={carouselData.length}
      >
        {carouselData.map(({ id, title, subTitle, buttonText, imgUrl }) => (
          <StyledGrid py={3} container key={id}>
            <GridItemOne item md={6} sm={6} xs={12}>
              <Box py={6}>
                <Paragraph color="primary.main">{subTitle}</Paragraph>
                <div className="titleBox">
                  <H1 maxWidth={400}>{title}</H1>
                </div>

                <CarouselButton variant="contained" sx={{ px: "30px", py: "8px" }}>
                  {buttonText}
                </CarouselButton>
              </Box>
            </GridItemOne>

            <GridItemTwo item md={6} sm={6} xs={12}>
              <LazyImage priority alt={title} width={600} height={450} src={imgUrl} />
            </GridItemTwo>
          </StyledGrid>
        ))}
      </Carousel>
    </StyledBox>
  );
};

export default Section1;
