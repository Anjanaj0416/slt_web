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
  position: "relative",
  overflow: "hidden",
  borderRadius: "3px",
  minHeight: "100px",

  backgroundImage: `url(https://ucarecdn.com/3c080e28-4b9e-4c4a-b31d-5a58bb3507f4/-/preview/1000x93/)`,
  backgroundSize: "contain",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
}));

// ======================================================================
type Props = { data: Banner };
// ======================================================================

const FullBanner: FC<Props> = ({ data }) => {
  return (
    <Link href={data?.link}>
      <Box
        component="img"
         src={`${ENVIRONMENT.S3_BUCKET_URL}/${data?.imageUrl}`}
        alt="Banner"
        sx={{
          width: "100%",
          height: {
            xs: 70, // mobile
            sm: 90, // tablet
            md: 140, // desktop
            lg: 150, // large screens
            xl: 160,
          },
          objectFit: "cover",
          display: "block",
          borderRadius:1.5
        }}
      ></Box>
    </Link>
  );
};

export default FullBanner;
