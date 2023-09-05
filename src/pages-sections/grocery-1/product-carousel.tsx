import { FC, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { styled, useTheme } from "@mui/material/styles";
// GLOBAL CUSTOM HOOK
import useWindowSize from "hooks/useWindowSize";
// GLOBAL CUSTOM COMPONENTS
import { Carousel } from "components/carousel";
import { Paragraph } from "components/Typography";
import { SectionCreator } from "components/section-header";
import { ProductCard4 } from "components/product-cards/product-card-4";
// CUSTOM DATA MODEL
import Product from "models/Product.model";

// STYLED COMPONENT
const SubTitle = styled(Paragraph)(({ theme }) => ({
  fontSize: 12,
  marginTop: "-20px",
  marginBottom: "20px",
  color: theme.palette.grey[600],
}));

// =================================================================
type Props = { title: string; products: Product[] };
// =================================================================

const ProductCarousel: FC<Props> = ({ products, title }) => {
  const width = useWindowSize();
  const { palette, shadows } = useTheme();
  const [visibleSlides, setVisibleSlides] = useState(3);

  useEffect(() => {
    if (width < 500) setVisibleSlides(1);
    else if (width < 650) setVisibleSlides(2);
    else if (width < 950) setVisibleSlides(3);
    else setVisibleSlides(3);
  }, [width]);

  // CAROUSEL BUTTON STYLES
  const STYLES = {
    "& #backArrowButton, #backForwardButton": {
      width: 40,
      height: 40,
      background: "#fff",
      boxShadow: shadows[2],
      color: palette.primary.main,
    },
  };

  return (
    <SectionCreator title={title} seeMoreLink="#" mb={0}>
      <SubTitle>Best collection in 2021 for you!</SubTitle>

      <Carousel
        sx={STYLES}
        infinite={true}
        totalSlides={products.length}
        visibleSlides={visibleSlides}
      >
        {products.map((item) => (
          <Box pb={2} key={item.id}>
            <ProductCard4
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
    </SectionCreator>
  );
};

export default ProductCarousel;
