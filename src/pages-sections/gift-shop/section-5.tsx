"use client";

import { FC, useEffect, useState } from "react";
import useTheme from "@mui/material/styles/useTheme";
// GLOBAL CUSTOM COMPONENTS
import { Carousel } from "components/carousel";
import { SectionCreator } from "components/section-header";
import { ProductCard6 } from "components/product-cards/product-card-6";
// GLOBAL CUSTOM HOOKS
import useWindowSize from "hooks/useWindowSize";
// CUSTOM DATA MODEL
import Product from "models/Product.model";
// COMMON CAROUSEL STYLES
import { CAROUSEL_STYLE } from "./styles";

// =========================================================
type Props = { products: Product[] };
// =========================================================

const Section5: FC<Props> = ({ products }) => {
  const width = useWindowSize();
  const theme = useTheme();
  const [visibleSlides, setVisibleSlides] = useState(4);

  useEffect(() => {
    if (width < 500) setVisibleSlides(1);
    else if (width < 650) setVisibleSlides(2);
    else if (width < 950) setVisibleSlides(4);
    else setVisibleSlides(4);
  }, [width]);

  return (
    <SectionCreator title="Popular Items" seeMoreLink="#">
      <Carousel
        infinite={true}
        visibleSlides={visibleSlides}
        totalSlides={products.length}
        sx={CAROUSEL_STYLE(theme, true)}
      >
        {products.map((item) => (
          <ProductCard6
            id={item.id}
            key={item.id}
            slug={item.slug}
            title={item.title}
            price={item.price}
            rating={item.rating}
            images={item.images}
            discount={item.discount}
            thumbnail={item.thumbnail}
          />
        ))}
      </Carousel>
    </SectionCreator>
  );
};

export default Section5;
