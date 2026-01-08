import { FC } from "react";
import styled from "@mui/material/styles/styled";
// GLOBAL CUSTOM COMPONENTS

// STYLED COMPONENT
const CardWrapper = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "img" &&
    prop !== "mode" &&
    prop !== "imgTablet" &&
    prop !== "imgMobile",
})<{ img: string; mode: string; imgTablet?: string; imgMobile?: string }>(
  ({ theme, img, imgTablet, imgMobile, mode }) => ({
    minHeight: 700,
    display: "flex",
    alignItems: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundImage: `url(${img}) !important`,
    backgroundColor: mode === "dark" ? "#000" : "#fff",
    borderRadius: 8,
    color: mode === "light" ? theme.palette.dark.main : "#fff",
    ".content":
      theme.direction === "rtl" ? { paddingRight: 80 } : { paddingLeft: 80 },

    [theme.breakpoints.down("md")]: {
      backgroundImage: imgTablet ? `url(${imgTablet}) !important` : "none",
      minHeight: 250,
    },

    [theme.breakpoints.down("sm")]: {
      backgroundImage: imgMobile ? `url(${imgMobile}) !important` : "none",
      minHeight: 300,
    },
  })
);

// ===============================================================
interface Props {
  bgImage?: string;
  bgImageTablet?: string;
  bgImageMobile?: string;
  mode?: "dark" | "light";
}
// ===============================================================

const CarouselCard5: FC<Props> = ({
  bgImage,
  bgImageMobile,
  bgImageTablet,
  mode = "dark",
}) => {
  return (
    <CardWrapper
      img={bgImage}
      imgTablet={bgImageTablet}
      imgMobile={bgImageMobile}
      mode={mode}
    />
  );
};

export default CarouselCard5;
