import { FC, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
// GLOBAL CUSTOM COMPONENTS
import { Carousel } from "components/carousel";
import { SectionHeader } from "components/section-header";
import { ProductCard5 } from "components/product-cards/product-card-5";
// GLOBAL CUSTOM HOOK
import useWindowSize from "hooks/useWindowSize";
// CUSTOM DATA MODEL
import Product from "models/Product.model";
// STYLED COMPONENT
import { SubTitle } from "./styles";

// ================================================================
type Props = { products: Product[] };
// ================================================================

const Section3: FC<Props> = ({ products }) => {
  const width = useWindowSize();
  const { palette } = useTheme();
  const [visibleSlides, setVisibleSlides] = useState(3);

  useEffect(() => {
    if (width < 500) setVisibleSlides(1);
    else if (width < 650) setVisibleSlides(2);
    else if (width < 950) setVisibleSlides(3);
    else setVisibleSlides(3);
  }, [width]);

  // CUSTOM STYLE FOR ARROW BUTTONS
  const CAROUSEL_STYLE = {
    "& #backArrowButton, #backForwardButton": {
      color: palette.primary.main,
      background: palette.primary[100],
      "&:hover": { background: palette.primary[200] },
    },
    "& #backArrowButton": { left: 0, borderRadius: "0 8px 8px 0" },
    "& #backForwardButton": { right: 0, borderRadius: "8px 0 0 8px" },
  };
  return (
    <Box>
      <SectionHeader title="Top New Products" seeMoreLink="#" />
      <SubTitle>Best deal with medical and beauty items</SubTitle>

      <Carousel
        infinite={true}
        sx={CAROUSEL_STYLE}
        visibleSlides={visibleSlides}
        totalSlides={products.length}
      >
        {products.map((item) => (
          <Box pt={0.5} pb={2} key={item.id}>
            <ProductCard5
              id={item.id}
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
  );
};

export default Section3;
