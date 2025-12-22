"use client";

import Grid from "@mui/material/Grid";
import styled from "@mui/material/styles/styled";
import Container from "@mui/material/Container";
// CUSTOM UTILS LIBRARY FUNCTION
import Banner from "models/Banner.model";
import { FC } from "react";
import { ENVIRONMENT } from "config";
import Link from "next/link";

// STYLED COMPONENT
const BannerBox = styled("div")<{ img: string }>(({ img }) => ({
  position: "relative",
  width: "100%",
  paddingTop: "50%",
  backgroundImage: `url(${ENVIRONMENT.S3_BUCKET_URL}/${img})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  borderRadius: "6px",
}));

// ======================================================================
type Props = { data: Banner[] };
// ======================================================================

const HalfBanner: FC<Props> = ({ data }) => {
  return (
    <Grid
      container
      spacing={3}
      mb={{ xs: 1, md: 0.5 }}
      mt={{ xs: "1px", md: 0 }}
    >
      <Grid item md={6} xs={12}>
        <Link href={data[0]?.link} target="_blank">
          <BannerBox img={data[0]?.imageUrl} />{" "}
        </Link>
      </Grid>
      <Grid item md={6} xs={12}>
        <Link href={data?.[1]?.link} target="_blank">
          <BannerBox img={data?.[1]?.imageUrl} />
        </Link>
      </Grid>
    </Grid>
  );
};

export default HalfBanner;
