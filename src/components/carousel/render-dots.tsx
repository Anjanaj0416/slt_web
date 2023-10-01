import { CarouselStoreInterface } from "pure-react-carousel";
// STYLED COMPONENT
import { StyledDot } from "./styles";

// ==============================================================
interface Props {
  step: number;
  dotColor: string;
  totalSlides: number;
  currentSlide: number;
  visibleSlides: number;
  carouselStore: CarouselStoreInterface;
}
// ==============================================================

export const renderDots = (props: Props) => {
  const { step, dotColor, totalSlides, currentSlide, visibleSlides, carouselStore } = props || {};

  const dots = [];
  const total = totalSlides - visibleSlides + 1;

  // handle dot button
  const handleClick = (currentSlide: number, autoPlay: boolean) => {
    carouselStore.setStoreState({ isPlaying: autoPlay, currentSlide });
  };

  for (let i = 0; i < total; i += step) {
    dots.push(
      <StyledDot
        dot_color={dotColor}
        onClick={() => handleClick(i, false)}
        dot_active={currentSlide === i}
        key={(Math.random() * i + Date.now()).toString()}
      />
    );

    if (total - (i + 1) < step && total - (i + 1) !== 0) {
      dots.push(
        <StyledDot
          dot_color={dotColor}
          dot_active={totalSlides - visibleSlides}
          key={(Math.random() * i + Date.now()).toString()}
          onClick={() => handleClick(totalSlides - visibleSlides, false)}
        />
      );
    }
  }

  return dots;
};
