"use client";

import { FC, useCallback, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Container from "@mui/material/Container";
import styled from "@mui/material/styles/styled";
// GLOBAL CUSTOM COMPONENTS
import { H3 } from "components/Typography";
import { NavLink3 } from "components/nav-link";
import { Carousel } from "components/carousel";
import { ProductCard10 } from "components/product-cards/product-card-10";
// PRODUCT DATA MODEL
import { Product1 } from "models/Product.model";
import { useLazyFilteredProductsQuery } from "services/product-api";
import Category1 from "models/Category.model";
import { ENVIRONMENT } from "config";

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
  const [filteredProducts, { isLoading }] = useLazyFilteredProductsQuery();

  const getProducts = useCallback(
    async (categoryIds) => {
      const products: Product1[] = (await filteredProducts({ categoryIds }))
        .data?.data;

      setProducts(
        products.map((product) => {
          return {
            ...product,
            images: product.images.map(
              (image) => `${ENVIRONMENT.S3_BUCKET_URL}/${image}`
            ),
          };
        })
      );
    },
    [filteredProducts]
  );

  const getAllSubCategoryIds = useCallback((category) => {
    let subCategoryIds = [];
    if (category.subCategories !== null && category.subCategories.length > 0) {
      category.subCategories.forEach((subCategory) => {
        subCategoryIds.push(subCategory.id);
        subCategoryIds = subCategoryIds.concat(
          getAllSubCategoryIds(subCategory)
        );
      });
    }
    //
    return subCategoryIds;
  }, []);

  useEffect(() => {
    if (data?.id) {
      const categoryIds: string[] = getAllSubCategoryIds(data);
      categoryIds.push(data.id);
      getProducts(categoryIds.join(","));
    }
  }, [data, getAllSubCategoryIds, getProducts]);
  //
  if (!data) return null;
  const responsive = [
    { breakpoint: 1200, settings: { slidesToShow: 3 } },
    { breakpoint: 650, settings: { slidesToShow: 2 } },
    { breakpoint: 426, settings: { slidesToShow: 1 } },
  ];

  const handleCategoryClick = (category: Category1) => {
    const categoryIds: string[] = getAllSubCategoryIds(category);
    categoryIds.push(category.id);
    getProducts(categoryIds.join(","));
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
            {isLoading ? (
              //TODO: Add loading component
              <Container>Loading...</Container>
            ) : (
              <Carousel
                slidesToShow={4}
                responsive={responsive}
                arrowStyles={{ backgroundColor: "dark.main" }}
              >
                {products?.map((product) => (
                  <ProductCard10 product={product} key={product.id} />
                ))}
              </Carousel>
            )}
          </Grid>
        }
      </Grid>
    </Container>
  );
};

export default CategoryBasedProducts;
