"use client";

import { FC } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import useTheme from "@mui/material/styles/useTheme";
// LOCAL CUSTOM COMPONENT
import BannerCard from "./banner-card";
// GLOBAL CUSTOM COMPONENTS
import { NavLink3 } from "components/nav-link";
import { Carousel } from "components/carousel";
import { H4, Paragraph } from "components/Typography";
import { CarouselCard4 } from "components/carousel-cards";
// CUSTOM DATA MODEL
import { MainCarouselItem } from "models/Market-2.model";
import { COMMON_DOT_STYLES } from "components/carousel/styles";
import { ENVIRONMENT } from "config";
import Banner from "models/Banner.model";

// ======================================================
type Props = { carouselData: Banner[]; topBanners: Banner[] };
// ======================================================

const Section1: FC<Props> = ({ carouselData, topBanners }) => {
  const { palette } = useTheme();
  return (
    <Box pt={3}>
      <Container>
        <Grid container spacing={2}>
          {/* MAIN CAROUSEL AREA */}
          <Grid item md={9} xs={12}>
            <Carousel
              dots
              arrows={false}
              spaceBetween={0}
              slidesToShow={1}
              dotColor={palette.dark.main}
              dotStyles={COMMON_DOT_STYLES}
            >
              {carouselData.map((item, ind) => (
                <CarouselCard4
                  key={ind}
                  link={item.link}
                  mode="light"
                  bgImage={`${ENVIRONMENT.S3_BUCKET_URL}/${item.imageUrl}`}
                />
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
                <BannerCard
                  key={banner.id}
                  imageFull
                  flex={1}
                  img={`${ENVIRONMENT.S3_BUCKET_URL}/${banner.imageUrl}`}
                >
                  <div style={{ paddingTop: "70px" }}>
                    <NavLink3
                      href={banner.link}
                      text="Shop Now"
                      color="dark.main"
                    />
                  </div>
                </BannerCard>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Section1;
