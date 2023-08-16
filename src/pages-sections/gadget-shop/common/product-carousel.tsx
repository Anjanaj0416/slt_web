import { FC, useEffect, useState } from "react";
import Box from "@mui/material/Box";
// GLOBAL CUSTOM COMPONENTS
import Carousel from "components/carousel/Carousel";
import ProductCard3 from "components/product-cards/ProductCard3";
// GLOBAL CUSTOM HOOK
import useWindowSize from "hooks/useWindowSize";
// CUSTOM DATA MODEL
import Product from "models/Product.model";

// ===============================================================
type Props = { products: Product[] };
// ===============================================================

const ProductCarousel: FC<Props> = ({ products }) => {
  const [visibleSlides, setVisibleSlides] = useState(4);
  const width = useWindowSize();

  useEffect(() => {
    if (width < 500) setVisibleSlides(1);
    else if (width < 650) setVisibleSlides(2);
    else if (width < 1100) setVisibleSlides(3);
    else setVisibleSlides(4);
  }, [width]);

  const ARROW_BUTTON_STYLE = {
    backgroundColor: "white",
    color: "#2B3445",
    top: "35%",
  };

  return (
    <Box mt={-0.5} mb={-0.5}>
      <Carousel
        infinite={true}
        visibleSlides={visibleSlides}
        totalSlides={products.length}
        leftButtonStyle={ARROW_BUTTON_STYLE}
        rightButtonStyle={ARROW_BUTTON_STYLE}
      >
        {products.map((item, ind) => (
          <ProductCard3
            key={ind}
            slug={item.slug}
            title={item.title}
            price={item.price}
            off={item.discount}
            rating={item.rating}
            imgUrl={item.thumbnail}
            hideFavoriteIcon
          />
        ))}
      </Carousel>
    </Box>
  );
};

export default ProductCarousel;
