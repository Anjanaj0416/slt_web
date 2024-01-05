"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
// GLOBAL CUSTOM COMPONENTS
import { Carousel } from "components/carousel";
import { H3, Paragraph } from "components/Typography";
import { FlexBetween } from "components/flex-box";
import { ProductCard10 } from "components/product-cards/product-card-10";
import { useLazyListProductsQuery } from "services/product-api";
// PRODUCT DATA MODEL
import { Product1 } from "models/Product.model";

const SelectedProducts = () => {
  const [selected, setSelected] = useState("new");
  const [products, setProducts] = useState<Product1[]>([]);
  const [listProducts, { isLoading }] = useLazyListProductsQuery();

  useEffect(() => {
    getProducts();
  }, []);

  const responsive = [
    { breakpoint: 1200, settings: { slidesToShow: 4 } },
    { breakpoint: 1024, settings: { slidesToShow: 3 } },
    { breakpoint: 650, settings: { slidesToShow: 2 } },
    { breakpoint: 426, settings: { slidesToShow: 1 } },
  ];

  // SELECTED BUTTON
  const handleSelected = (item: string) => () => setSelected(item);

  // BUTTON ACTIVE COLOR
  const activeColor = (item: string) => (item === selected ? "error" : "dark");

  const getProducts = async () => {
    const products: Product1[] = (await listProducts({ page:0, size:5 })).data?.data;
    setProducts(products);
  };

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
        <div>
          <H3>Selected Products</H3>
          <Paragraph>
            All our new arrivals in a exclusive brand selection
          </Paragraph>
        </div>

        {/* FILTERED BUTTON LIST */}
        {/* <FlexBox flexWrap="wrap" gap={1} sx={{ "& button": { flexGrow: 1 } }}>
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
        </FlexBox> */}
      </FlexBetween>

      {/* PRODUCT CAROUSEL */}
      <Carousel
        slidesToShow={5}
        responsive={responsive}
        arrowStyles={{ backgroundColor: "dark.main" }}
      >
        {products.map((product) => (
          <ProductCard10 product={product} key={product.id} />
        ))}
      </Carousel>
    </Container>
  );
};

export default SelectedProducts;
