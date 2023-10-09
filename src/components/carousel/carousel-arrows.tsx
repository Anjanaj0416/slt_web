import { CustomArrowProps } from "react-slick";
import { SxProps, Theme, useTheme } from "@mui/material/styles";
// MUI ICON COMPONENTS
import ArrowBack from "@mui/icons-material/ArrowBack";
import ArrowForward from "@mui/icons-material/ArrowForward";
// STYLED COMPONENT
import { ArrowButton } from "./styles";

// ==============================================================
interface ArrowProps extends CustomArrowProps {
  sx?: SxProps<Theme>;
}
// ==============================================================

function NextArrow({ onClick, sx }: ArrowProps) {
  const { direction } = useTheme();

  return (
    <ArrowButton onClick={onClick} className="slick-arrow next" right={0} sx={{ ...sx }}>
      {direction === "rtl" ? (
        <ArrowBack fontSize="small" color="inherit" />
      ) : (
        <ArrowForward fontSize="small" color="inherit" />
      )}
    </ArrowButton>
  );
}

function PrevArrow({ onClick, sx }: ArrowProps) {
  const { direction } = useTheme();

  return (
    <ArrowButton onClick={onClick} className="slick-arrow prev" left={0} sx={{ ...sx }}>
      {direction === "rtl" ? (
        <ArrowForward fontSize="small" color="inherit" />
      ) : (
        <ArrowBack fontSize="small" color="inherit" />
      )}
    </ArrowButton>
  );
}

const CarouselArrows = (sx?: SxProps<Theme>) => {
  return {
    nextArrow: <NextArrow sx={sx} />,
    prevArrow: <PrevArrow sx={sx} />,
  };
};

export default CarouselArrows;
