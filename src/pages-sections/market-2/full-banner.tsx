"use client";

import styled from "@mui/material/styles/styled";
// GLOBAL CUSTOM COMPONENTS
import Banner from "models/Banner.model";
import { FC } from "react";
import { ENVIRONMENT } from "config";
import { Box } from "@mui/material";
import Link from "next/link";

// STYLED COMPONENT
const BannerWrapper = styled("div")<{ img: string }>(({ theme, img }) => ({
  zIndex: 1,
 
  overflow: "hidden",
  borderRadius: "3px",
  position: "relative",
  minHeight: "100px",
  ":after": {
    top: 0,
    left: 0,
    bottom:0,
    zIndex: -1,
    content: "''",
    width: "100%",
    height: "100%",

    position: "absolute",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundImage: `url(${ENVIRONMENT.S3_BUCKET_URL}/${img})`,
    ...(theme.direction === "rtl" && {
      transform: "rotateX(180deg) rotateZ(180deg)",
    }),
  },

  [theme.breakpoints.down("md")]: {
    gap: "1rem",
    flexDirection: "column",
    justifyContent: "center",
  },
}));

// ======================================================================
type Props = { data: Banner };
// ======================================================================

const FullBanner: FC<Props> = ({ data }) => {
  return (
    <Box sx={{ my: 0.5 }} width={"100%"} height={"100%"}>
      <Link href={data?.link}>
        <BannerWrapper img={data?.imageUrl}></BannerWrapper>
      </Link>
    </Box>
  );
};

export default FullBanner;
