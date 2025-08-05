"use client";

import styled from "@mui/material/styles/styled";
// GLOBAL CUSTOM COMPONENTS
import WhiteButton from "components/WhiteButton";
import Banner from "models/Banner.model";
import { FC } from "react";
import { ENVIRONMENT } from "config";
import { Box } from "@mui/material";

// STYLED COMPONENT
const BannerWrapper = styled("div")<{ img: string }>(({ theme, img }) => ({
  zIndex: 1,
  gap: "5rem",
  padding: "2rem",
  display: "flex",
  flexWrap: "wrap",
  overflow: "hidden",
  borderRadius: "3px",
  alignItems: "center",
  position: "relative",
  justifyContent: "flex-end",
  ":after": {
    top: 0,
    left: 0,
    zIndex: -1,
    content: "''",
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundSize: "cover",
    backgroundPosition: "center left",
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
    <Box sx={{ my: 2 }} width={"100%"} height={"100%"}>
      <BannerWrapper img={data?.imageUrl}>
        <WhiteButton size="large">Discover Now</WhiteButton>
      </BannerWrapper>
    </Box>
  );
};

export default FullBanner;
