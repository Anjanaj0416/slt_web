import { FC } from "react";
import Box, { BoxProps } from "@mui/material/Box";
import styled from "@mui/material/styles/styled";

// STYLED COMPONENTS
const CardWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== "img", // prevent img from being passed to DOM
})<{ img: string }>(({ theme, img }) => ({
  overflow: "hidden",
  cursor: "pointer",
  height: 260,
  maxHeight: 540,
  width: "100%",
  borderRadius: 8,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundImage: `url(${img}) !important`,
  [theme.breakpoints.down("lg")]: {
    display: "none",
  },
  [theme.breakpoints.up("lg")]: {
    display: "block",
  },
}));

// ========================================================
interface Props extends BoxProps {
  img: string;
  imageFull?: boolean;
}
// ========================================================

const BannerCard: FC<Props> = ({ img, imageFull, ...props }) => {
  return <CardWrapper img={img} {...props}></CardWrapper>;
};

export default BannerCard;
