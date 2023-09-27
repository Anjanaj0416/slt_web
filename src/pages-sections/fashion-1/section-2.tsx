"use client";

import { FC, useEffect, useState } from "react";
// GLOBAL CUSTOM COMPONENTS
import { Carousel } from "components/carousel";
import { SectionCreator } from "components/section-header";
import { ProductCard2 } from "components/product-cards/product-card-2";
// GLOBAL CUSTOM HOOK
import useWindowSize from "hooks/useWindowSize";
// CUSTOM ICON COMPONENT
import Light from "icons/Light";
// COMMON STYLES
import { ARROW_BUTTON_STYLE } from "./style";
// CUSTOM DATA MODEL
import Product from "models/Product.model";

// =================================================
type Props = { flashDeals: Product[] };
// =================================================

const Section2: FC<Props> = ({ flashDeals }) => {
  const width = useWindowSize();
  const [visibleSlides, setVisibleSlides] = useState(4);

  useEffect(() => {
    if (width < 500) setVisibleSlides(1);
    else if (width < 650) setVisibleSlides(2);
    else if (width < 950) setVisibleSlides(3);
    else setVisibleSlides(4);
  }, [width]);

  return (
    <SectionCreator icon={<Light color="primary" />} title="Flash Deals">
      <Carousel
        infinite={true}
        visibleSlides={visibleSlides}
        totalSlides={flashDeals.length}
        leftButtonStyle={ARROW_BUTTON_STYLE}
        rightButtonStyle={ARROW_BUTTON_STYLE}
      >
        {flashDeals.map((item) => (
          <ProductCard2
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

export default Section2;
