"use client";

import { FC, useEffect, useState } from "react";
// GLOBAL CUSTOM COMPONENTS
import { Carousel } from "components/carousel";
import { ProductCard2 } from "components/product-cards/product-card-2";
import { SectionCreator } from "components/section-header";
// GLOBAL CUSTOM HOOK
import useWindowSize from "hooks/useWindowSize";
// COMMON STYLES
import { ARROW_BUTTON_STYLE } from "./style";
// CUSTOM DATA MODEL
import Product from "models/Product.model";

// ==========================================================
type Props = { newArrivals: Product[] };
// ==========================================================

const Section3: FC<Props> = ({ newArrivals }) => {
  const width = useWindowSize();
  const [visibleSlides, setVisibleSlides] = useState(6);

  useEffect(() => {
    if (width < 500) setVisibleSlides(1);
    else if (width < 650) setVisibleSlides(2);
    else if (width < 950) setVisibleSlides(4);
    else setVisibleSlides(6);
  }, [width]);

  return (
    <SectionCreator title="New Arrivals" seeMoreLink="#">
      <Carousel
        infinite={true}
        visibleSlides={visibleSlides}
        totalSlides={newArrivals.length}
        leftButtonStyle={ARROW_BUTTON_STYLE}
        rightButtonStyle={ARROW_BUTTON_STYLE}
      >
        {newArrivals.map((item, ind) => (
          <ProductCard2
            hideReview
            hideFavoriteIcon
            key={item.id}
            slug={item.slug}
            title={item.title}
            price={item.price}
            off={item.discount}
            rating={item.rating}
            imgUrl={item.thumbnail}
          />
        ))}
      </Carousel>
    </SectionCreator>
  );
};

export default Section3;
