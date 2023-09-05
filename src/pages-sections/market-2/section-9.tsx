"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
// GLOBAL CUSTOM HOOK
import useWindowSize from "hooks/useWindowSize";
// GLOBAL CUSTOM COMPONENTS
import { Carousel } from "components/carousel";
import { H3, Paragraph } from "components/Typography";
import { FlexBetween, FlexBox } from "components/flex-box";
import { ProductCard10 } from "components/product-cards/product-card-10";
import { carouselStyled } from "components/carousel/styles";
// CUSTOM DATA MODEL
import Product from "models/Product.model";

const Section9 = () => {
  const width = useWindowSize();
  const [selected, setSelected] = useState("new");
  const [visibleSlides, setVisibleSlides] = useState(4);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get("/api/market-2/products", { params: { type: selected } })
      .then(({ data }) => setProducts(data));
  }, [selected]);

  useEffect(() => {
    if (width < 426) setVisibleSlides(1);
    else if (width < 650) setVisibleSlides(2);
    else if (width < 1024) setVisibleSlides(3);
    else if (width < 1200) setVisibleSlides(4);
    else setVisibleSlides(5);
  }, [width]);

  // SELECTED BUTTON
  const handleSelected = (item: string) => () => setSelected(item);

  // BUTTON ACTIVE COLOR
  const activeColor = (item: string) => (item === selected ? "error" : "dark");

  // FILTERABLE BUTTON LIST
  const FILTER_BUTTONS = [
    { id: 1, title: "New Arrivals", value: "new" },
    { id: 2, title: "Best Seller", value: "best" },
    { id: 3, title: "Most Popular", value: "popular" },
    { id: 4, title: "View All", value: "view" },
  ];

  return (
    <Container sx={{ pb: 8 }}>
      <FlexBetween gap={2} flexWrap="wrap" mb={3}>
        {/* SECTION TITLE */}
        <Box>
          <H3>Selected Products</H3>
          <Paragraph>All our new arrivals in a exclusive brand selection</Paragraph>
        </Box>

        {/* FILTERED BUTTON LIST */}
        <FlexBox flexWrap="wrap" gap={1} sx={{ "& button": { flexGrow: 1 } }}>
          {FILTER_BUTTONS.map(({ id, title, value }) => (
            <Button
              key={id}
              variant="outlined"
              color={activeColor(value)}
              onClick={handleSelected(value)}
            >
              {title}
            </Button>
          ))}
        </FlexBox>
      </FlexBetween>

      {/* PRODUCT CAROUSEL */}
      <Carousel
        visibleSlides={visibleSlides}
        totalSlides={products.length}
        sx={{ ...carouselStyled, "& .carousel__inner-slide": { pb: 0.5 } }}
      >
        {products.map((product) => (
          <ProductCard10 product={product} key={product.id} />
        ))}
      </Carousel>
    </Container>
  );
};

export default Section9;
