import { FC } from "react";
import Link from "next/link";
import Button from "@mui/material/Button";
import styled from "@mui/material/styles/styled";
// GLOBAL CUSTOM COMPONENTS

// STYLED COMPONENT
const CardWrapper = styled("div", {
  shouldForwardProp: (prop) => prop !== "img" && prop !== "mode",
})<{ img: string; mode: string; imgTablet?: string; imgMobile?: string }>(
  ({ theme, img, imgTablet, imgMobile, mode }) => ({
    minHeight: 500,
    display: "flex",
    alignItems: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundImage: `url(${img}) !important`,
    backgroundColor: mode === "dark" ? "#000" : "#fff",
    color: mode === "light" ? theme.palette.dark.main : "#fff",
    ".content":
      theme.direction === "rtl" ? { paddingRight: 80 } : { paddingLeft: 80 },

    [theme.breakpoints.down("md")]: {
      backgroundImage: imgTablet ? `url(${imgTablet}) !important` : "none",
    },

    [theme.breakpoints.down("sm")]: {
      backgroundImage: imgMobile ? `url(${imgMobile}) !important` : "none",
    },
  })
);

// ===============================================================
interface Props {
  bgImage?: string;
  bgImageTablet?: string;
  bgImageMobile?: string;
  link: string;
  mode?: "dark" | "light";
}
// ===============================================================

const CarouselCard4: FC<Props> = ({
  bgImage,
  bgImageMobile,
  bgImageTablet,
  link,
  mode = "dark",
}) => {
  return (
    <CardWrapper
      img={bgImage}
      imgTablet={bgImageTablet}
      imgMobile={bgImageMobile}
      mode={mode}
    >
      <div className="content" style={{ paddingTop: "230px" }}>
        <Button
          size="large"
          color="dark"
          href={link}
          variant="contained"
          LinkComponent={Link}
        >
          Shop Now
        </Button>
      </div>
    </CardWrapper>
  );
};

export default CarouselCard4;
