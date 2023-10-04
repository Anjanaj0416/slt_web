"use client";

import { FC, useEffect, useState } from "react";
import useTheme from "@mui/material/styles/useTheme";
// GLOBAL CUSTOM COMPONENTS
import { Carousel } from "components/carousel";
import { ProductCard6 } from "components/product-cards/product-card-6";
import { SectionCreator } from "components/section-header";
// GLOBAL CUSTOM HOOK
import useWindowSize from "hooks/useWindowSize";
// CUSTOM DATA MODEL
import Product from "models/Product.model";
// COMMON CAROUSEL STYLES
import { CAROUSEL_STYLE } from "./styles";

// =========================================================
type Props = { products: Product[] };
// =========================================================

const Section6: FC<Props> = ({ products }) => {
  const theme = useTheme();
  const width = useWindowSize();
  const [visibleSlides, setVisibleSlides] = useState(4);

  useEffect(() => {
    if (width < 500) setVisibleSlides(1);
    else if (width < 650) setVisibleSlides(2);
    else if (width < 950) setVisibleSlides(4);
    else setVisibleSlides(4);
  }, [width]);

  return (
    <SectionCreator title="Top Sale Items" seeMoreLink="#">
      <Carousel
        infinite={true}
        sx={CAROUSEL_STYLE(theme, true)}
        visibleSlides={visibleSlides}
        totalSlides={products.length}
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
            sx={{ "& #imgBox": { backgroundColor: "primary.200" } }}
          />
        ))}
      </Carousel>
    </SectionCreator>
  );
};

export default Section6;
