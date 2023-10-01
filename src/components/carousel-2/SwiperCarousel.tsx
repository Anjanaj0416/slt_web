"use client";

import { Children, FC, PropsWithChildren, useState } from "react";
import { Swiper, SwiperProps, SwiperSlide, SwiperSlideProps } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import ArrowBack from "@mui/icons-material/ArrowBack";
import ArrowForward from "@mui/icons-material/ArrowForward";
import { alpha, styled } from "@mui/material";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// STYLED COMPONENT
const SwiperContainer = styled("div")(({ theme }) => ({
  overflow: "hidden",
  position: "relative",

  "& .swiper:has(+ .swiper-controls .swiper-pagination)": { marginBottom: 40 },

  "& .swiper-controls": {
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    position: "absolute",

    ".swiper-pagination": {
      bottom: 0,
      ".swiper-pagination-bullet": {
        width: 8,
        height: 8,
        backgroundColor: theme.palette.grey[600],
        "&.swiper-pagination-bullet-active": {
          backgroundColor: theme.palette.primary.main,
          boxShadow: `${alpha(theme.palette.primary.main, 0.1)} 0px 0px 0px 4px`,
        },
      },
    },

    ".swiper-navigation": {
      pointerEvents: "all",
      ".swiper-button": {
        width: 50,
        height: 50,
        // borderRadius: "50%",
        backgroundColor: theme.palette.primary.main,
        "::after": { display: "none" },
        // ".MuiSvgIcon-root": { color: theme.palette.grey[900], fontSize: 14 },
        // "&.swiper-button-disabled": { opacity: 0.6 },
      },
    },
  },

  ".swiper-button-prev svg, .swiper-button-next svg": {
    // width: "auto",
    // height: "auto",
    all: "unset",
    width: "none",
  },
}));

// ==============================================================
interface Props extends SwiperProps, PropsWithChildren {
  slideProps?: SwiperSlideProps;
}
// ==============================================================

const Carousel: FC<Props> = ({
  children,
  navigation,
  pagination,
  slideProps = {},
  slidesPerView = 3,
  spaceBetween = 24,
}) => {
  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null);
  const [paginationEl, setPaginationEl] = useState<HTMLElement | null>(null);

  return (
    <SwiperContainer>
      <Swiper
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        modules={[Navigation, Pagination, A11y]}
        navigation={navigation ? { nextEl, prevEl } : false}
        pagination={pagination ? { el: paginationEl, clickable: true } : false}
      >
        {Children.map(children, (child) => (
          <SwiperSlide {...slideProps}>{child}</SwiperSlide>
        ))}
      </Swiper>

      <div className="swiper-controls">
        {/* =============custom navigation ============= */}
        {navigation ? (
          <div className="swiper-navigation">
            <div
              role="button"
              ref={(node) => setPrevEl(node)}
              className="swiper-button swiper-button-prev"
            >
              <ArrowBack />
            </div>

            <div
              role="button"
              ref={(node) => setNextEl(node)}
              //   className="swiper-button swiper-button-next"
              className="swiper-button swiper-button-next"
            >
              <ArrowForward />
            </div>
          </div>
        ) : null}

        {/* ============= custom pagination =============*/}
        {pagination ? (
          <div className="swiper-pagination" ref={(node) => setPaginationEl(node)} />
        ) : null}
      </div>
    </SwiperContainer>
  );
};

export default Carousel;
