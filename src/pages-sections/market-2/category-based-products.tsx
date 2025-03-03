"use client";

import { FC, useCallback, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Container from "@mui/material/Container";
import styled from "@mui/material/styles/styled";
// GLOBAL CUSTOM COMPONENTS
import { H3, H4 } from "components/Typography";
import { NavLink3 } from "components/nav-link";
import { Carousel } from "components/carousel";
import { ProductCard10 } from "components/product-cards/product-card-10";
// PRODUCT DATA MODEL
import { Product1 } from "models/Product.model";
import { useLazyFilteredProductsQuery } from "services/product-api";
import Category1 from "models/Category.model";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import LazyImage from "components/LazyImage";
import ENVIRONMENT from "config/environment";
import { Typography } from "@mui/material";
import Image from "next/image";
import { FlexBox } from "components/flex-box";

// STYLED COMPONENTS
const StyledListItem = styled(ListItem)(({ theme }) => ({
  fontSize: 13,
  fontWeight: 500,
  cursor: "pointer",
  padding: "10px 0 0 0",
  transition: "all 0.3s",
  ":hover": { color: theme.palette.primary.main },
}));

const StyledCard = styled(Card)(() => ({
  border: 0,
  height: "100%",
  borderRadius: "3px",
  padding: "1rem 2rem",
}));

// ======================================================================
type Props = { data: Category1 };
// ======================================================================

const CategoryBasedProducts: FC<Props> = ({ data }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, { isFetching }] = useLazyFilteredProductsQuery();

  const getProducts = useCallback(
    async (categoryId) => {
      const products: Product1[] = (await filteredProducts({ categoryId })).data
        ?.data;
      //
      if (products?.length) {
        const lengthDiff = 4 - products?.length;
        if (lengthDiff > 0) {
          setProducts((prvState) => [...products, ...new Array(lengthDiff)]);
        } else {
          setProducts((prvState) => products);
        }
      } else {
        setProducts((prvState) => []);
      }
    },
    [filteredProducts]
  );

  useEffect(() => {
    if (data?.id) {
      getProducts(data?.id);
    }
  }, [data, getProducts]);
  //
  if (!data) return null;
  const responsive = [
    { breakpoint: 1200, settings: { slidesToShow: 3 } },
    { breakpoint: 650, settings: { slidesToShow: 2 } },
    { breakpoint: 426, settings: { slidesToShow: 1 } },
  ];

  const handleCategoryClick = (category: Category1) => {
    getProducts(category.id);
  };

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item md={3} xs={12}>
          <StyledCard elevation={0}>
            {/* MAIN CATEGORY NAME/TITLE */}
            <H3>{data.name}</H3>

            {/* SUB CATEGORY LIST */}
            <List sx={{ mb: 2 }}>
              {data.subCategories?.map((item) => (
                <StyledListItem
                  key={item.id}
                  onClick={() => handleCategoryClick(item)}
                >
                  {item.name}
                </StyledListItem>
              ))}
            </List>

            <NavLink3
              href="/"
              text="Browse All"
              color="dark.main"
              hoverColor="dark.main"
            />
          </StyledCard>
        </Grid>

        {/* CATEGORY BASED PRODUCTS CAROUSEL */}
        {
          <Grid item md={9} xs={12}>
            {isFetching || !products ? (
              <CircularProgress />
            ) : products?.length < 1 ? (
              <FlexBox
                flexDirection="column"
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Image
                  width={200}
                  height={200}
                  alt={"No Products"}
                  src={`${ENVIRONMENT.APP_URL}/assets/images/empty-box.png`}
                  className="product-img"
                />
                <H4 mt={3}>There is no products !</H4>
              </FlexBox>
            ) : (
              <Carousel
                slidesToShow={4}
                responsive={responsive}
                arrowStyles={{ backgroundColor: "dark.main" }}
              >
                {products?.map((product, index) => {
                  if (product) {
                    return <ProductCard10 product={product} key={product.id} />;
                  }
                  return <div key={index}></div>;
                })}
              </Carousel>
            )}
          </Grid>
        }
      </Grid>
    </Container>
  );
};

export default CategoryBasedProducts;
