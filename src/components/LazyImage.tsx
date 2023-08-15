import { FC } from "react";
import NextImage, { ImageProps } from "next/image";
import { styled } from "@mui/material/styles";

const LazyImage = styled<FC<ImageProps>>((props) => <NextImage {...props} />)({
  width: "100%",
  height: "auto",
});

export default LazyImage;
