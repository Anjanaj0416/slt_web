"use client";

import { FC } from "react";
import useTheme from "@mui/material/styles/useTheme";
// GLOBAL CUSTOM COMPONENTS
import { Carousel } from "components/carousel";
import { H1, H6, Paragraph } from "components/Typography";
import { FurnitureCarouselItem } from "models/Carousel.model";
// STYLED COMPONENTS
import { StyledBox, StyledButton, ContainerBox, GridItemOne, StyledGrid, TextBox } from "./styles";

// =============================================================================
type Props = { mainCarouselData: FurnitureCarouselItem[] };
// =============================================================================

const Section1: FC<Props> = ({ mainCarouselData }) => {
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
        totalSlides={mainCarouselData.length}
      >
        {mainCarouselData.map((item) => (
          <ContainerBox key={item.id}>
            <StyledGrid container>
              <GridItemOne item lg={6} md={8} xs={12}>
                <H6>{item.subTitle}</H6>
                <H1 fontSize={60}>{item.title}</H1>

                <TextBox>
                  <Paragraph color="grey.600">{item.description}</Paragraph>
                </TextBox>

                <StyledButton color="primary" variant="contained">
                  {item.buttonText}
                </StyledButton>
              </GridItemOne>
            </StyledGrid>
          </ContainerBox>
        ))}
      </Carousel>
    </StyledBox>
  );
};

export default Section1;
