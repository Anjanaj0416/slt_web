import { FC, ReactNode } from "react";
import Box, { BoxProps } from "@mui/material/Box";
import { styled } from "@mui/material/styles";
// GLOBAL CUSTOM COMPONENT
import LazyImage from "components/LazyImage";

// STYLED COMPONENTS
const CardWrapper = styled(Box)({
  overflow: "hidden",
  position: "relative",
});

const CardContent = styled(Box)(({ theme }) => ({
  top: 0,
  left: 32,
  zIndex: 1,
  height: "100%",
  display: "flex",
  position: "absolute",
  flexDirection: "column",
  justifyContent: "center",
  ...(theme.direction === "rtl" && { left: "auto", right: 32, textAlign: "right" }),
}));

// ========================================================
interface Props extends BoxProps {
  img: string;
  children: ReactNode;
}
// ========================================================

const BannerCard: FC<Props> = ({ img, children, ...props }) => {
  return (
    <CardWrapper {...props}>
      <LazyImage alt="category" height={239} width={330} src={img} />
      <CardContent>{children}</CardContent>
    </CardWrapper>
  );
};

export default BannerCard;
