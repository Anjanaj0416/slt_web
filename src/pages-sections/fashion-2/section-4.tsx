"use client";

import { FC, useEffect, useState } from "react";
import Container from "@mui/material/Container";
// GLOBAL CUSTOM HOOK
import useWindowSize from "hooks/useWindowSize";
// GLOBAL CUSTOM COMPONENTS
import { H2 } from "components/Typography";
import { Carousel } from "components/carousel";
import { ProductCard8 } from "components/product-cards/product-card-8";
import { carouselStyled } from "components/carousel/styles";
// CUSTOM DATA MODEL
import Product from "models/Product.model";

// ======================================================================
type Props = { products: Product[] };
// ======================================================================

const Section4: FC<Props> = ({ products }) => {
  const width = useWindowSize();
  const [visibleSlides, setVisibleSlides] = useState(4);

  useEffect(() => {
    if (width < 426) setVisibleSlides(1);
    else if (width < 650) setVisibleSlides(2);
    else if (width < 1024) setVisibleSlides(3);
    else setVisibleSlides(4);
  }, [width]);

  return (
    <Container sx={{ mt: 8 }}>
      <H2 textAlign="center" mb={4}>
        Best Selling Product
      </H2>

      <Carousel totalSlides={products.length} visibleSlides={visibleSlides} sx={carouselStyled}>
        {products.map((product) => (
          <ProductCard8 key={product.id} product={product} />
        ))}
      </Carousel>
    </Container>
  );
};

export default Section4;
