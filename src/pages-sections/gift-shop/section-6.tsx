"use client";

import { FC, useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
// GLOBAL CUSTOM COMPONENTS
import { Carousel } from "components/carousel";
import ProductCard16 from "components/product-cards/ProductCard16";
import CategorySectionCreator from "components/CategorySectionCreator";
// GLOBAL CUSTOM HOOK
import useWindowSize from "hooks/useWindowSize";
// CUSTOM DATA MODEL
import Product from "models/Product.model";

// =========================================================
type Props = { products: Product[] };
// =========================================================

const Section6: FC<Props> = ({ products }) => {
  const width = useWindowSize();
  const { palette, shadows } = useTheme();
  const [visibleSlides, setVisibleSlides] = useState(4);

  useEffect(() => {
    if (width < 500) setVisibleSlides(1);
    else if (width < 650) setVisibleSlides(2);
    else if (width < 950) setVisibleSlides(4);
    else setVisibleSlides(4);
  }, [width]);

  return (
    <CategorySectionCreator title="Top Sale Items" seeMoreLink="#">
      <Carousel
        infinite={true}
        visibleSlides={visibleSlides}
        totalSlides={products.length}
        sx={{
          "& .carousel__slider": { paddingBottom: "15px" },
          "& #backArrowButton, #backForwardButton": {
            width: 35,
            height: 35,
            borderRadius: 0,
            boxShadow: shadows[2],
            color: palette.primary.main,
            background: palette.primary[50],
            "&:hover": { background: palette.primary[100] },
          },
        }}
      >
        {products.map((item) => (
          <ProductCard16
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
    </CategorySectionCreator>
  );
};

export default Section6;
