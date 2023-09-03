"use client";

import { FC, Fragment, useEffect, useState } from "react";
import Container from "@mui/material/Container";
// GLOBAL CUSTOM HOOK
import useWindowSize from "hooks/useWindowSize";
// GLOBAL CUSTOM COMPONENTS
import { H2 } from "components/Typography";
import { Carousel } from "components/carousel";
import { carouselStyled } from "components/carousel/styles";
import { ProductCard8 } from "components/product-cards/product-card-8";
// CUSTOM DATA MODEL
import Product from "models/Product.model";

// ======================================================================
type Props = { products: Product[] };
// ======================================================================

const Section6: FC<Props> = ({ products }) => {
  const width = useWindowSize();
  const [visibleSlides, setVisibleSlides] = useState(4);

  useEffect(() => {
    if (width < 426) setVisibleSlides(1);
    else if (width < 650) setVisibleSlides(2);
    else if (width < 1024) setVisibleSlides(3);
    else if (width < 1200) setVisibleSlides(4);
    else setVisibleSlides(5);
  }, [width]);

  return (
    <Fragment>
      {/* FEATURED PRODUCTS AREA */}
      <Container sx={{ mt: 8 }}>
        <H2 textAlign="center" mb={4}>
          Featured Products
        </H2>

        <Carousel totalSlides={products.length} visibleSlides={visibleSlides} sx={carouselStyled}>
          {products.map((product) => (
            <ProductCard8 key={product.id} product={product} />
          ))}
        </Carousel>
      </Container>
    </Fragment>
  );
};

export default Section6;
