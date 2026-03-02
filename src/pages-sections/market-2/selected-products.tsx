"use client";
import { ReactNode, useCallback, useEffect, useState } from "react";
import Container from "@mui/material/Container";
// GLOBAL CUSTOM COMPONENTS
import { Carousel } from "components/carousel";
import { H2, H3, Paragraph } from "components/Typography";
import { FlexBetween } from "components/flex-box";
import { ProductCard10 } from "components/product-cards/product-card-10";
import { useFilteredProductsQuery } from "services/product-api";
// PRODUCT DATA MODEL
import { Product1 } from "models/Product.model";
import { Box } from "@mui/material";
import Category1 from "models/Category.model";
import Banner from "models/Banner.model";
import FullBanner from "./full-banner";
import HalfBanner from "./half-banner";

type Props = {
  category: Category1;
  banner: Banner | Banner[];
};
const SelectedProducts = ({ category, banner }: Props) => {
  const { data: products, isLoading } = useFilteredProductsQuery({
    categoryId: category.id,
    size: 20,
  });
  //
  const responsive = [
    { breakpoint: 1200, settings: { slidesToShow: 4 } },
    { breakpoint: 1024, settings: { slidesToShow: 3 } },
    { breakpoint: 650, settings: { slidesToShow: 2 } },
    { breakpoint: 426, settings: { slidesToShow: 2} },
  ];
  console.log(banner);

  return (
    <Container disableGutters maxWidth="xl">
      <Box mb={3}>
        <H2>{category.name}</H2>
      </Box>

      {/* PRODUCT CAROUSEL */}
      {isLoading ? (
        <Container>Loading...</Container>
      ) : (
        <Box>
          <Carousel
            slidesToShow={5}
            responsive={responsive}
            arrowStyles={{ backgroundColor: "dark.main" }}
            autoplay
            autoplaySpeed={5000}
          >
            {products.data?.map((product) => (
              <ProductCard10 product={product} key={product.id} />
            ))}
          </Carousel>
          <Box sx={{ py: 3 }}>
            {Array.isArray(banner) && banner?.length === 2 && (
              <HalfBanner data={banner} />
            )}
            {!Array.isArray(banner) && banner?.bannerType === "FULL" && (
              <FullBanner data={banner} />
            )}
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default SelectedProducts;
