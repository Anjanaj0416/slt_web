"use client";

import { FC, useEffect, useState } from "react";
import Box from "@mui/material/Box";
// GLOBAL CUSTOM COMPONENTS
import { Carousel } from "components/carousel";
import { ProductCard2 } from "components/product-cards/product-card-2";
import CategorySectionCreator from "components/CategorySectionCreator";
// GLOBAL CUSTOM HOOK
import useWindowSize from "hooks/useWindowSize";
// CUSTOM DATA MODEL
import Product from "models/Product.model";

// =============================================
type Props = { mostViewedList: Product[] };
// =============================================

const Section4: FC<Props> = ({ mostViewedList }) => {
  const width = useWindowSize();
  const [visibleSlides, setVisibleSlides] = useState(4);

  useEffect(() => {
    if (width < 500) setVisibleSlides(1);
    else if (width < 650) setVisibleSlides(2);
    else if (width < 950) setVisibleSlides(3);
    else setVisibleSlides(4);
  }, [width]);

  const ARROW_BUTTON_STYLE = {
    backgroundColor: "white",
    color: "#2B3445",
  };

  return (
    <CategorySectionCreator title="Most Viewed">
      <Box mt={-0.5} mb={-0.5}>
        <Carousel
          infinite={true}
          visibleSlides={visibleSlides}
          totalSlides={mostViewedList.length}
          leftButtonStyle={ARROW_BUTTON_STYLE}
          rightButtonStyle={ARROW_BUTTON_STYLE}
        >
          {mostViewedList.map((item, ind) => (
            <Box py={0.5} key={ind}>
              <ProductCard2
                slug={item.slug}
                title={item.title}
                price={item.price}
                off={item.discount}
                rating={item.rating}
                imgUrl={item.thumbnail}
              />
            </Box>
          ))}
        </Carousel>
      </Box>
    </CategorySectionCreator>
  );
};

export default Section4;
