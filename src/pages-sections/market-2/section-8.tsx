"use client";

import { useEffect, useState, FC } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
// GLOBAL CUSTOM HOOK
import useWindowSize from "hooks/useWindowSize";
// GLOBAL CUSTOM COMPONENTS
import { H3 } from "components/Typography";
import { Carousel } from "components/carousel";
import BazaarImage from "components/BazaarImage";
import { FlexRowCenter } from "components/flex-box";
// CUSTOM DATA MODEL
import Brand from "models/Brand.model";

// ==========================================================
type Props = { brands: Brand[] };
// ==========================================================

const Section8: FC<Props> = ({ brands }) => {
  const width = useWindowSize();
  const [visibleSlides, setVisibleSlides] = useState(6);

  useEffect(() => {
    if (width < 650) setVisibleSlides(2);
    else if (width < 800) setVisibleSlides(3);
    else if (width < 1024) setVisibleSlides(4);
    else setVisibleSlides(5);
  }, [width]);

  return (
    <Container sx={{ my: 8 }}>
      <H3 mb={3}>Featured Brands</H3>

      <Box padding={4} bgcolor="white">
        <Carousel
          autoPlay
          showArrow={false}
          totalSlides={brands.length}
          visibleSlides={visibleSlides}
          sx={{ ":hover": { cursor: "grab" } }}
        >
          {brands.map(({ id, image }) => (
            <FlexRowCenter maxWidth={110} height="100%" margin="auto" key={id}>
              <BazaarImage alt="brand" width="100%" src={image} sx={{ filter: "grayscale(1)" }} />
            </FlexRowCenter>
          ))}
        </Carousel>
      </Box>
    </Container>
  );
};

export default Section8;
