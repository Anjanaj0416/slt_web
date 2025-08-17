"use client";

import Grid from "@mui/material/Grid";
// LOCAL CUSTOM COMPONENT
import BannerCard from "./banner-card";
// GLOBAL CUSTOM COMPONENTS
import { NavLink3 } from "components/nav-link";
import { FC } from "react";
import Banner from "models/Banner.model";
import { ENVIRONMENT } from "config";
import { Box } from "@mui/material";
import Link from "next/link";

// ======================================================================
type Props = { data: Banner[] };
// ======================================================================

const ThreeBanner: FC<Props> = ({ data }) => {
  return (
    <Box sx={{ pb: 3, display: { xs: "none", md: "flex" } }}>
      <Grid container spacing={3}>
        {/* NEW ARRIVALS */}
        <Grid item md={4} xs={12}>
          <Link href={data?.[0].link} target="_blank">
            <BannerCard
              img={`${ENVIRONMENT.S3_BUCKET_URL}/${data[0]?.imageUrl}`}
            />
          </Link>
        </Grid>

        {/* BEST SELLER */}
        <Grid item md={4} xs={12}>
          <Link href={data?.[0].link} target="_blank">
            {" "}
            <BannerCard
              img={`${ENVIRONMENT.S3_BUCKET_URL}/${data?.[1]?.imageUrl}`}
            />
          </Link>
        </Grid>

        {/* NEW ARRIVALS */}
        <Grid item md={4} xs={12}>
          <Link href={data?.[0].link} target="_blank">
            {" "}
            <BannerCard
              img={`${ENVIRONMENT.S3_BUCKET_URL}/${data?.[2]?.imageUrl}`}
            />
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ThreeBanner;
