"use client";

import Link from "next/link";
import { FC, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ArrowBack from "@mui/icons-material/ArrowBack";
import ArrowForward from "@mui/icons-material/ArrowForward";
// LOCAL CUSTOM COMPONENT
import DealWeekCard from "./shared/deal-week-card";
// GLOBAL CUSTOM COMPONENTS
import { Carousel } from "components/carousel";
import { SectionCreator } from "components/section-header";
// GLOBAL CUSTOM HOOK
import useSettings from "hooks/useSettings";

// ==========================================================
interface Props {
  dealOfTheWeek: {
    off: number;
    brand: string;
    imgUrl: string;
  }[];
}
// ==========================================================

const Section4: FC<Props> = ({ dealOfTheWeek }) => {
  const { settings } = useSettings();
  const [currentSlide, setCurrentSlide] = useState(0);

  const totalSlides = dealOfTheWeek.length / 4;
  const firstIndex = currentSlide * 4;
  const lastIndex = firstIndex + 4;

  const handleSlideChange = (count: number) => () => {
    if (count < 0) setCurrentSlide(0);
    else if (count > totalSlides - 1) setCurrentSlide(totalSlides - 1);
    else setCurrentSlide(count);
  };

  // custom arrow button for carousel
  const buttonStyled = (color1: string, color2: string) => ({
    boxShadow: 3,
    backgroundColor: color1,
    "&:hover": { backgroundColor: color1, color: color2 },
  });

  return (
    <SectionCreator title="Deal Of The Week">
      <Box position="relative">
        <Box position="absolute" top={-55} right={0}>
          {/* CAROUSEL PREV ARROW BUTTON */}
          <IconButton
            disableRipple
            onClick={handleSlideChange(currentSlide - 1)}
            sx={{ ...buttonStyled("white", "primary.500"), mr: 1 }}
          >
            {settings.direction === "ltr" ? (
              <ArrowBack fontSize="small" color="secondary" />
            ) : (
              <ArrowForward fontSize="small" color="secondary" />
            )}
          </IconButton>

          {/* CAROUSEL NEXT ARROW BUTTON */}
          <IconButton
            disableRipple
            onClick={handleSlideChange(currentSlide + 1)}
            sx={{ ...buttonStyled("primary.500", "white"), color: "white" }}
          >
            {settings.direction === "ltr" ? (
              <ArrowForward fontSize="small" color="inherit" />
            ) : (
              <ArrowBack fontSize="small" color="inherit" />
            )}
          </IconButton>
        </Box>
      </Box>

      {/* DEAL WEEK MAIN CAROUSEL */}
      <Carousel
        showDots
        visibleSlides={1}
        showArrow={false}
        totalSlides={totalSlides}
        currentSlide={currentSlide}
      >
        {[...new Array(totalSlides)].map((_item, ind) => (
          <Box py="0.25rem" key={ind}>
            <Grid container spacing={4}>
              {dealOfTheWeek.slice(firstIndex, lastIndex).map((item, ind) => (
                <Grid item md={6} xs={12} key={ind}>
                  <Link href="/">
                    <DealWeekCard imgUrl={item.imgUrl} title={item.brand} off={item.off} />
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
      </Carousel>
    </SectionCreator>
  );
};

export default Section4;
