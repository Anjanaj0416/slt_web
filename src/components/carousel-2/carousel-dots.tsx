import { Fragment, ReactNode } from "react";
import styled from "@mui/material/styles/styled";
import Box, { BoxProps } from "@mui/material/Box";

// STYLED COMPONENTS
const DotList = styled(Box)(({ theme }) => ({
  gap: 6,
  zIndex: 1,
  margin: 0,
  padding: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.primary.main,
  "& li": {
    width: 15,
    height: 15,
    display: "flex",
    cursor: "pointer",
    alignItems: "center",
    justifyContent: "center",
    "&.slick-active span::after": { scale: "1" },
  },
}));

const Dot = styled("span", {
  shouldForwardProp: (prop) => prop !== "dotColor",
})<{ dotColor?: string }>(({ dotColor, theme }) => ({
  width: "100%",
  height: "100%",
  cursor: "pointer",
  borderRadius: "50%",
  position: "relative",
  border: `1px solid ${dotColor || theme.palette.secondary.main}`,
  "&:after": {
    scale: 0,
    inset: 0,
    width: 9,
    height: 9,
    content: '""',
    margin: "auto",
    borderRadius: "50%",
    position: "absolute",
    transition: "scale 500ms ease-in-out",
    backgroundColor: dotColor || theme.palette.secondary.main,
  },
}));

// ==============================================================
interface Props extends BoxProps {
  dotColor?: string;
}
// ==============================================================

const CarouselDots = ({ dotColor, ...props }: Props) => {
  return {
    appendDots: (dots: ReactNode) => (
      <Fragment>
        <DotList component="ul" {...props}>
          {dots}
        </DotList>
      </Fragment>
    ),
    customPaging: () => <Dot dotColor={dotColor} />,
  };
};

export default CarouselDots;
