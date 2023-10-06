import { FC } from "react";
import Box from "@mui/material/Box";
// GLOBAL CUSTOM COMPONENTS
import { Carousel } from "components/carousel";
import { SectionHeader } from "components/section-header";
import { ProductCard4 } from "components/product-cards/product-card-4";
// CUSTOM DATA MODEL
import Product from "models/Product.model";
// STYLED COMPONENT
import { SubTitle } from "./styles";

// =================================================================
type Props = { title: string; products: Product[] };
// =================================================================

const ProductCarousel: FC<Props> = ({ products, title }) => {
  const responsive = [
    { breakpoint: 650, settings: { slidesToShow: 2 } },
    { breakpoint: 500, settings: { slidesToShow: 1 } },
  ];

  return (
    <Box overflow="hidden">
      <SectionHeader title={title} seeMoreLink="#" />
      <SubTitle>Best collection in 2021 for you!</SubTitle>

      <Carousel
        responsive={responsive}
        slidesToShow={3}
        arrowStyles={{
          width: 30,
          height: 30,
          boxShadow: 2,
          borderRadius: 1,
          background: "white",
          color: "primary.main",
          transition: "all 0.4s ease",
        }}
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
    </Box>
  );
};

export default ProductCarousel;
