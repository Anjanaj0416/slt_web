import { CSSObject, Theme, styled } from "@mui/material";
import { ButtonBack, ButtonNext, CarouselProvider, DotGroup, Slider } from "pure-react-carousel";

// StyledCarouselProvider and StyledSlider component props type
type StyledProps = { spacing: string | undefined };

// StyledArrowButton components props type
type ArrowButtonProps = {
  showDots?: boolean;
  showArrowOnHover?: boolean;
  dot_margin_top?: string | number;
};

// common styles for arrow back and next button
const commonArrowBtnStyle = ({
  theme,
  showDots,
  dot_margin_top,
  showArrowOnHover,
}: ArrowButtonProps & { theme: Theme }): CSSObject => ({
  width: 35,
  border: 0,
  height: 35,
  opacity: 0,
  alignItems: "center",
  position: "absolute",
  justifyContent: "center",
  transform: "translateY(-50%)",
  background: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
  display: showArrowOnHover ? "none" : "flex",
  boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
  top: `calc(50% - ${showDots ? dot_margin_top : "0px"})`,
  transition: "all 0.4s ease",

  "&:disabled": {
    cursor: "not-allowed",
    color: theme.palette.secondary.main,
    background: theme.palette.text.disabled,
  },

  "&:hover:not(:disabled)": {
    background: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },

  [theme.breakpoints.down("xs")]: { display: "block !important" },
});

// styled components
const StyledCarouselProvider = styled(CarouselProvider, {
  shouldForwardProp: (prop) => prop !== "spacing",
})<StyledProps>(({ spacing }) => ({
  minWidth: 0,
  position: "relative",
  "& .focusRing___1airF.carousel__slide-focus-ring": {
    outline: "none !important",
  },

  "& .carousel__inner-slide": {
    margin: "auto",
    width: `calc(100% - ${spacing || "0px"})`,
  },

  "&:hover $arrowButton": { display: "flex" },

  ":hover": {
    "& #backArrowButton": { opacity: 1 },
    "& #backForwardButton": { opacity: 1 },
  },
}));

const StyledSlider = styled(Slider, {
  shouldForwardProp: (prop) => prop !== "spacing",
})<StyledProps>(({ spacing }) => ({
  marginLeft: `calc(-1 * ${spacing || "0px"} / 2)`,
  marginRight: `calc(-1 * ${spacing || "0px"} / 2)`,
}));

const StyledDotGroup = styled(DotGroup, {
  shouldForwardProp: (prop) => prop !== "dot_margin_top",
})<{ dot_margin_top?: string | number }>(({ dot_margin_top }) => ({
  display: "flex",
  justifyContent: "center",
  marginTop: dot_margin_top || "0px",
}));

const StyledDot = styled("div", {
  shouldForwardProp: (prop) => prop !== "dot_color" && prop !== "dot_active",
})<{ dot_color?: string; dot_active?: any }>(({ dot_color, dot_active, theme }) => ({
  width: 16,
  height: 16,
  borderRadius: 300,
  margin: "0.25rem",
  cursor: "pointer",
  position: "relative",
  border: `1px solid ${dot_color || theme.palette.secondary.main}`,
  "&:after": {
    width: 9,
    height: 9,
    top: "50%",
    left: "50%",
    content: '" "',
    borderRadius: 300,
    position: "absolute",
    transform: `translate(-50%, -50%) scaleX(${dot_active ? 1 : 0})`,
    backgroundColor: dot_color || theme.palette.secondary.main,
  },
}));

const StyledArrowBackButton = styled(ButtonBack, {
  shouldForwardProp: (prop) =>
    prop !== "showArrowOnHover" && prop !== "showDots" && prop !== "dot_margin_top",
})<ArrowButtonProps>(({ theme, showArrowOnHover, showDots, dot_margin_top }) => ({
  left: 0,
  ...commonArrowBtnStyle({ theme, showDots, showArrowOnHover, dot_margin_top }),
  [theme.breakpoints.down("md")]: { height: "36px", width: "36px", left: "-12px" },
}));

const StyledArrowNextButton = styled(ButtonNext, {
  shouldForwardProp: (prop) =>
    prop !== "showArrowOnHover" && prop !== "showDots" && prop !== "dot_margin_top",
})<ArrowButtonProps>(({ theme, showArrowOnHover, showDots, dot_margin_top }) => ({
  right: 0,
  ...commonArrowBtnStyle({ theme, showDots, showArrowOnHover, dot_margin_top }),
  [theme.breakpoints.down("md")]: { height: "36px", width: "36px", right: "-12px" },
}));

const carouselStyled: CSSObject = {
  overflow: "hidden",
  "& .carousel__back-button, & .carousel__next-button": {
    width: 30,
    opacity: 1,
    color: "white",
    borderRadius: 0,
    transition: "0.3s",
    backgroundColor: "dark.main",
    ":hover:not(:disabled)": { color: "white", backgroundColor: "dark.main" },
  },
  "& .carousel__back-button": {
    left: 0,
    boxShadow: "-4px 0 7px -5px rgb(0 0 0 / 20%)",
  },
  "& .carousel__next-button": {
    right: 0,
    boxShadow: "4px 0 7px -5px rgb(0 0 0 / 20%)",
  },
  "& .carousel__next-button:disabled, & .carousel__back-button:disabled": {
    opacity: 0.6,
  },
};

export {
  StyledDot,
  StyledSlider,
  StyledDotGroup,
  carouselStyled,
  commonArrowBtnStyle,
  StyledCarouselProvider,
  StyledArrowBackButton,
  StyledArrowNextButton,
};
