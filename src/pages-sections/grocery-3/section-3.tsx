import { FC, useEffect, useState } from "react";
import { Box, styled, useTheme } from "@mui/material";
// GLOBAL CUSTOM COMPONENTS
import { H1 } from "components/Typography";
import { Carousel } from "components/carousel";
import ProductCard10 from "components/product-cards/ProductCard10";
// GLOBAL CUSTOM HOOK
import useWindowSize from "hooks/useWindowSize";
// CUSTOM DATA MODEL
import Product from "models/Product.model";

// STYLED COMPONENT
const TitleBox = styled(Box)(({ theme }) => ({
  textAlign: "center",
  "& h1": {
    fontSize: 40,
    fontWeight: 600,
    marginBottom: "10px",
  },
  "& div": {
    width: 200,
    height: "2px",
    margin: "auto",
    background: theme.palette.primary.main,
  },
}));

// ===============================================================
type Props = { products: Product[] };
// ===============================================================

const Section3: FC<Props> = ({ products }) => {
  const theme = useTheme();
  const width = useWindowSize();
  const [visibleSlides, setVisibleSlides] = useState(3);

  useEffect(() => {
    if (width < 500) setVisibleSlides(1);
    else if (width < 650) setVisibleSlides(2);
    else if (width < 950) setVisibleSlides(3);
    else setVisibleSlides(3);
  }, [width]);

  const CAROUSEL_STYLES = {
    "& #backArrowButton, #backForwardButton": {
      width: 40,
      height: 40,
      borderRadius: 0,
      background: "#fff",
      boxShadow: theme.shadows[2],
      color: theme.palette.primary.main,
    },
  };

  return (
    <Box>
      <TitleBox my={4}>
        <H1>Top Sales Products</H1>
        <Box />
      </TitleBox>

      <Carousel
        infinite={true}
        sx={CAROUSEL_STYLES}
        visibleSlides={visibleSlides}
        totalSlides={products.length}
      >
        {products.map((item) => (
          <Box py={0.5} key={item.id}>
            <ProductCard10
              hideRating
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
