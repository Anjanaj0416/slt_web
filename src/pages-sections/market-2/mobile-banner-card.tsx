import { FC } from "react";
import Box, { BoxProps } from "@mui/material/Box";
import styled from "@mui/material/styles/styled";

// STYLED COMPONENTS
const CardWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== "img", // prevent img from being passed to DOM
})<{ img: string }>(({ img }) => ({

  cursor: "pointer",
  height: 200,
  maxHeight: 240,
  width: "45vw",
  borderRadius: 8,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundImage: `url(${img}) !important`,
}));

// ========================================================
interface Props extends BoxProps {
  img: string;
  imageFull?: boolean;
}
// ========================================================

const MobileBannerCard: FC<Props> = ({ img, imageFull, ...props }) => {
  return <CardWrapper img={img} {...props}></CardWrapper>;
};

export default MobileBannerCard;
