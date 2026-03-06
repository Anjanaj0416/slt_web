"use client";

import { FC } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import useTheme from "@mui/material/styles/useTheme";
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
    return { tabletImage, mobileImage };
  }

  return (
    <Box pt={3}>
      <Grid container spacing={2} alignItems="stretch">

        {/* MAIN CAROUSEL AREA */}
        <Grid item lg={9} xs={12} sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ maxHeight: { lg: 480, xl: 680 }, overflow: "hidden", borderRadius: "8px" }}>
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
          </Box>
        </Grid>

        {/* RIGHT SIDE BANNERS — only on lg+ screens, fills full grid row height */}
        <Grid
          item
          lg={3}
          sx={{
            display: { xs: "none", lg: "flex" },
            flexDirection: "column",
          }}
        >
          {topBanners.map((banner, index) => (
            <Link
              key={banner.id}
              href={banner.link}
              style={{
                flex: 1,
                display: "flex",
                marginTop: index > 0 ? 8 : 0,
                minHeight: 0,
              }}
            >
              <Box
                component="img"
                src={`${ENVIRONMENT.S3_BUCKET_URL}/${banner.imageUrl}`}
                alt="banner"
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "block",
                  objectFit: "cover",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              />
            </Link>
          ))}
        </Grid>

      </Grid>
    </Box>
  );
};

export default Section1;