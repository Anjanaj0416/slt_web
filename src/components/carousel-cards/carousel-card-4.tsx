import { FC } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import styled from "@mui/material/styles/styled";
// GLOBAL CUSTOM COMPONENTS
import { H1, H4, Paragraph, Span } from "components/Typography";

// STYLED COMPONENT
const CardWrapper = styled("div", {
  shouldForwardProp: (prop) => prop !== "img" && prop !== "mode",
})<{ img: string; mode: string }>(({ theme, img, mode }) => ({
  minHeight: 500,
  display: "flex",
  alignItems: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundImage: `url(${img})`,
  backgroundColor: mode === "dark" ? "#000" : "#fff",
  color: mode === "light" ? theme.palette.dark.main : "#fff",
  ".content":
    theme.direction === "rtl" ? { paddingRight: 80 } : { paddingLeft: 80 },
  [theme.breakpoints.down("md")]: {
    padding: 24,
    textAlign: "center",
    backgroundImage: "none",
    justifyContent: "center",
  },
}));

// ===============================================================
interface Props {
  bgImage?: string;
  link: string;
  mode?: "dark" | "light";
}
// ===============================================================

const CarouselCard4: FC<Props> = ({ bgImage, link, mode = "dark" }) => {
  return (
    <CardWrapper img={bgImage} mode={mode}>
      <div className="content" style={{ paddingTop: "120px" }}>
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
