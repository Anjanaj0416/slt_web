"use client";

import { FC } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import useTheme from "@mui/material/styles/useTheme";
// LOCAL CUSTOM COMPONENT
import BannerCard from "./banner-card";
// GLOBAL CUSTOM COMPONENTS
import { Carousel } from "components/carousel";
import { CarouselCard4 } from "components/carousel-cards";
// CUSTOM DATA MODEL
import { COMMON_DOT_STYLES } from "components/carousel/styles";
import { ENVIRONMENT } from "config";
import Banner from "models/Banner.model";
import Link from "next/link";

// ======================================================
type Props = { carouselData: Banner[]; topBanners: Banner[] };
// ======================================================

const Section1: FC<Props> = ({ carouselData, topBanners }) => {
  const { palette } = useTheme();
  function getResponsiveImageUrls(imageUrl) {
    const extensionRegex = /\.(png|jpg|jpeg|webp)$/i;

    const tabletImage = imageUrl.replace(extensionRegex, "_tablet.$1");
    const mobileImage = imageUrl.replace(extensionRegex, "_mobile.$1");

    return {
      tabletImage,
      mobileImage,
    };
  }
  return (
    <Box
      pt={3}
      display={"flex"}
      justifyContent={"center"}
      flexDirection={"column"}
    >
      <Grid container spacing={2}>
        {/* MAIN CAROUSEL AREA */}
        <Grid item md={9} xs={12}>
          <Carousel
            dots
            arrows={false}
            spaceBetween={0}
            slidesToShow={1}
            autoplay
            dotColor={palette.dark.main}
            dotStyles={COMMON_DOT_STYLES}
          >
            {carouselData.map((item) => (
              <Link key={item.id} href={item.link}>
                <CarouselCard4
                  mode="light"
                  bgImage={`${ENVIRONMENT.S3_BUCKET_URL}/${item.imageUrl}`}
                  bgImageTablet={
                    getResponsiveImageUrls(
                      `${ENVIRONMENT.S3_BUCKET_URL}/${item.imageUrl}`
                    ).tabletImage
                  }
                  bgImageMobile={
                    getResponsiveImageUrls(
                      `${ENVIRONMENT.S3_BUCKET_URL}/${item.imageUrl}`
                    ).mobileImage
                  }
                />
              </Link>
            ))}
          </Carousel>
        </Grid>

        <Grid item md={3} xs={12}>
          <Stack
            height="100%"
            direction={{ md: "column", sm: "row", xs: "column" }}
            spacing={2}
          >
            {/* SUMMER SALE BANNER */}
            {topBanners.map((banner) => (
              <Link key={banner.id} href={banner.link}>
                <BannerCard
                  imageFull
                  flex={1}
                  img={`${ENVIRONMENT.S3_BUCKET_URL}/${banner.imageUrl}`}
                />
              </Link>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Section1;
