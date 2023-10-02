import { CSSProperties, FC, ReactNode, Children } from "react";
import { SxProps } from "@mui/material/styles";
import Box from "@mui/material/Box";
import clsx from "clsx";
import { Slide } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

// LOCAL CUSTOM COMPONENTS
import ArrowButton from "./arrow-button";
import { renderDots } from "./render-dots";
// STYLED COMPONENTS
import { StyledSlider, StyledDotGroup, StyledCarouselProvider } from "./styles";

// ===================================================================
export interface CarouselProps {
  children?: ReactNode;
  sx?: SxProps;
  step?: number;
  interval?: number;
  infinite?: boolean;
  autoPlay?: boolean;
  totalSlides: number;
  currentSlide?: number;
  visibleSlides?: number;
  naturalSlideWidth?: number;
  naturalSlideHeight?: number;
  isIntrinsicHeight?: boolean;
  hasMasterSpinner?: boolean;
  dotClass?: string;
  dotColor?: string;
  showDots?: boolean;
  dotGroupMarginTop?: string;
  spacing?: string;
  showArrow?: boolean;
  arrowButtonClass?: string;
  leftButtonClass?: string;
  rightButtonClass?: string;
  leftButtonStyle?: CSSProperties;
  rightButtonStyle?: CSSProperties;
}
// ===================================================================

const Carousel: FC<CarouselProps> = ({
  children,
  dotClass,
  dotColor,
  currentSlide,
  leftButtonClass,
  leftButtonStyle = {},
  arrowButtonClass,
  rightButtonClass,
  rightButtonStyle = {},
  sx = {},
  step = 1,
  interval = 2000,
  infinite = false,
  autoPlay = false,
  showDots = false,
  showArrow = true,
  totalSlides = 10,
  visibleSlides = 5,
  spacing = "1.5rem",
  naturalSlideWidth = 100,
  hasMasterSpinner = false,
  isIntrinsicHeight = true,
  naturalSlideHeight = 125,
  dotGroupMarginTop = "2rem",
}) => {
  return (
    <StyledCarouselProvider
      sx={sx}
      step={step}
      spacing={spacing}
      interval={interval}
      infinite={infinite}
      isPlaying={autoPlay}
      totalSlides={totalSlides}
      currentSlide={currentSlide}
      visibleSlides={visibleSlides}
      hasMasterSpinner={hasMasterSpinner}
      isIntrinsicHeight={isIntrinsicHeight}
      naturalSlideWidth={naturalSlideWidth}
      naturalSlideHeight={naturalSlideHeight}
    >
      <Box position="relative">
        <StyledSlider spacing={spacing}>
          {Children.map(children, (child, ind) => (
            <Slide index={ind}>{child}</Slide>
          ))}
        </StyledSlider>

        {/* RENDER CAROUSEL ARROW BUTTONS */}
        {showArrow ? (
          <ArrowButton
            arrowButtonClass={arrowButtonClass}
            leftButtonClass={leftButtonClass}
            leftButtonStyle={leftButtonStyle}
            rightButtonClass={rightButtonClass}
            rightButtonStyle={rightButtonStyle}
          />
        ) : null}
      </Box>

      {/* RENDER CAROUSEL DOT GROUPS */}
      {showDots ? (
        <StyledDotGroup
          className={clsx(dotClass)}
          dot_margin_top={dotGroupMarginTop}
          renderDots={(props: any) => renderDots({ ...props, step, dotColor })}
        />
      ) : null}
    </StyledCarouselProvider>
  );
};

export default Carousel;
