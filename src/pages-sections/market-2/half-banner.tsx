"use client";

import Grid from "@mui/material/Grid";
import styled from "@mui/material/styles/styled";
import Container from "@mui/material/Container";
// CUSTOM UTILS LIBRARY FUNCTION
import Banner from "models/Banner.model";
import { FC } from "react";
import { ENVIRONMENT } from "config";

// STYLED COMPONENT
const BannerBox = styled("div", {
  shouldForwardProp: (prop) => prop !== "img",
})<{ img: string }>(({ theme, img }) => ({
  padding: 32,
  overflow: "hidden",
  borderRadius: "3px",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  height: "100%",
  backgroundImage: `url(${ENVIRONMENT.S3_BUCKET_URL}/${img})`,
  ...(theme.direction === "rtl" && {
    textAlign: "right",
    "& > .MuiDivider-root": { marginLeft: "auto" },
  }),
}));

// ======================================================================
type Props = { data: Banner[] };
// ======================================================================

const HalfBanner: FC<Props> = ({ data }) => {
  return (
    //TODO: Fix banner height
    <Container sx={{ my: 8 }}>
      <Grid container spacing={3}>
        {/* FINAL REDUCTION BANNER */}
        <Grid item md={6} xs={12}>
          <BannerBox img={data[0]?.imageUrl}/>
        </Grid>

        {/* WEEKEND SALE BANNER */}
        <Grid item md={6} xs={12}>
          <BannerBox img={data[1]?.imageUrl}/>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HalfBanner;
