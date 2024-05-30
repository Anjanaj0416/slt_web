"use client";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
// LOCAL CUSTOM COMPONENT
import BannerCard from "./banner-card";
// GLOBAL CUSTOM COMPONENTS
import { NavLink3 } from "components/nav-link";
import { FC } from "react";
import Banner from "models/Banner.model";
import { ENVIRONMENT } from "config";

// ======================================================================
type Props = { data: Banner[] };
// ======================================================================

const ThreeBanner: FC<Props> = ({ data }) => {
  return (
    <Container sx={{ pb: 8 }}>
      <Grid container spacing={3}>
        {/* NEW ARRIVALS */}
        <Grid item md={4} xs={12}>
          <BannerCard img={`${ENVIRONMENT.S3_BUCKET_URL}/${data[0]?.imageUrl}`}>
            <NavLink3
              href={data[0]?.link}
              text="Shop Now"
              color="dark.main"
              hoverColor="dark.main"
            />
          </BannerCard>
        </Grid>

        {/* BEST SELLER */}
        <Grid item md={4} xs={12}>
          <BannerCard img={`${ENVIRONMENT.S3_BUCKET_URL}/${data[1]?.imageUrl}`}>
            <NavLink3
              href={data[1]?.link}
              text="Shop Now"
              color="white"
              hoverColor="white"
            />
          </BannerCard>
        </Grid>

        {/* NEW ARRIVALS */}
        <Grid item md={4} xs={12}>
          <BannerCard img={`${ENVIRONMENT.S3_BUCKET_URL}/${data[2]?.imageUrl}`}>
            <NavLink3
              href={data[2]?.link}
              text="Shop Now"
              color="dark.main"
              hoverColor="dark.main"
            />
          </BannerCard>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ThreeBanner;
