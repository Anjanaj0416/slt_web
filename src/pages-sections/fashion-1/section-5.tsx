"use client";

import { FC } from "react";
import Image from "next/image";
import Container from "@mui/material/Container";
// GLOBAL CUSTOM COMPONENTS
import { Carousel } from "components/carousel";
import { CarouselCard2 } from "components/carousel-cards";
// STYLED COMPONENTS
import { ARROW_BUTTON_STYLE, ContentWrapper, BadgeBox } from "./style";

// ========================================================
type Props = { hotDealList: any[] };
// ========================================================

const Section5: FC<Props> = ({ hotDealList }) => {
  return (
    <Container sx={{ pb: 8 }}>
      <ContentWrapper>
        <Carousel
          totalSlides={3}
          infinite={true}
          visibleSlides={1}
          leftButtonStyle={ARROW_BUTTON_STYLE}
          rightButtonStyle={ARROW_BUTTON_STYLE}
        >
          {hotDealList.map((item, index) => {
            const expireDate = new Date(item.expireDate).getTime();
            return (
              <CarouselCard2
                key={index}
                imgUrl={item.imgUrl}
                expireDate={expireDate}
                productName={item.productName}
              />
            );
          })}
        </Carousel>

        <BadgeBox>
          <Image src="/assets/images/badges/hot.svg" width={110} height={130} alt="New" />
        </BadgeBox>
      </ContentWrapper>
    </Container>
  );
};

export default Section5;
