import Box from "@mui/material/Box";
import { CustomArrowProps } from "react-slick";
import { SxProps, Theme, styled } from "@mui/material/styles";
// MUI ICON COMPONENTS
import ArrowBack from "@mui/icons-material/ArrowBack";
import ArrowForward from "@mui/icons-material/ArrowForward";

// STYLED COMPONENT
const ArrowButton = styled(Box)(({ theme }) => ({
  zIndex: 1,
  width: 35,
  height: 35,
  padding: 0,
  opacity: 0,
  top: "50%",
  display: "flex",
  cursor: "pointer",
  position: "absolute",
  alignItems: "center",
  justifyContent: "center",
  transform: "translate(0, -50%)",
  transition: "all 0.2s ease-in-out",
  color: theme.palette.secondary.contrastText,
  backgroundColor: theme.palette.secondary.main,
  boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
}));

// ==============================================================
interface ArrowProps extends CustomArrowProps {
  sx?: SxProps<Theme>;
}
// ==============================================================

function NextArrow({ onClick, sx }: ArrowProps) {
  return (
    <ArrowButton onClick={onClick} className="slick-arrow next" right={0} sx={{ ...sx }}>
      <ArrowForward fontSize="small" color="inherit" />
    </ArrowButton>
  );
}

function PrevArrow({ onClick, sx }: ArrowProps) {
  return (
    <ArrowButton onClick={onClick} className="slick-arrow prev" left={0} sx={{ ...sx }}>
      <ArrowBack fontSize="small" color="inherit" />
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
