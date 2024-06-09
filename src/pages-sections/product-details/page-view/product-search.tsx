"use client";

import { useCallback, useState } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { Theme } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
// GLOBAL CUSTOM COMPONENTS
import Sidenav from "components/side-nav/side-nav";
import { FlexBox } from "components/flex-box";
import { H5, Paragraph } from "components/Typography";
import ProductsListView from "components/products-view/products-list-view";
// PRODUCT DATA
import productDatabase from "data/product-database";
import { Product1 } from "models/Product.model";
import Category1 from "models/Category.model";
import ProductFilterCard1 from "../product-filter-card-1";
import ProductsGridView1 from "components/products-view/products-grid-view-1";

const SORT_OPTIONS = [
  { label: "Relevance", value: "Relevance" },
  { label: "Date", value: "Date" },
  { label: "Price Low to High", value: "Price Low to High" },
  { label: "Price High to Low", value: "Price High to Low" },
];

// ==============================================================
type Props = {
  products: Product1[];
  searchText: string;
  totalResults: number;
  totalPages: number;
};
// ==============================================================

const ProductSearchPageView = ({
  products,
  searchText,
  totalResults,
  totalPages,
}: Props) => {
  const [view, setView] = useState("grid");
  const downMd = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const toggleView = useCallback((v: string) => () => setView(v), []);
  const PRODUCTS = productDatabase.slice(95, 104);
  let parentCategories: Category1[] = [];
  // Get brands
  const brands = Array.from(
    new Set(products.map((product) => product.brand))
  ).slice(0, 5);

  // Get all parent id of categories
  products.forEach((e) => {
    if (e.category.parentCategory != null) {
      parentCategories.push(e.category.parentCategory);
    } else {
      parentCategories.push(e.category);
    }
  });

  // Remove duplicates of parent categories
  parentCategories = parentCategories.filter(
    (category, index, self) =>
      index === self.findIndex((t) => t.id === category.id)
  );

  // Sub categories assign to parents
  products.forEach((product) => {
    const category = { ...product.category };
    if (category.parentCategory) {
      const index = parentCategories.findIndex(
        (e) => e.id === category.parentCategory.id
      );

      category.parentCategory = null;

      if (
        parentCategories[index].subCategories &&
        !parentCategories[index].subCategories.some((e) => e.id === category.id)
      ) {
        parentCategories[index].subCategories.push(category);
      } else {
        parentCategories[index].subCategories = [category];
      }
    }
  });

  return (
    <Container sx={{ mt: 4, mb: 6 }}>
      {/* FILTER ACTION AREA */}
      <Card
        elevation={1}
        sx={{
          mb: "55px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          p: {
            sm: "1rem 1.25rem",
            md: "0.5rem 1.25rem",
            xs: "1.25rem 1.25rem 0.25rem",
          },
        }}
      >
        <div>
          <H5>{`Searching for “ ${searchText} ”`}</H5>
          <Paragraph color="grey.600">
            {totalResults > 1
              ? `${totalResults} results found`
              : `${totalResults} result found`}
          </Paragraph>
        </div>

        {products.length > 0 && (
          <FlexBox
            alignItems="center"
            columnGap={4}
            flexWrap="wrap"
            my="0.5rem"
          >
            <FlexBox alignItems="center" gap={1} flex="1 1 0">
              <Paragraph color="grey.600" whiteSpace="pre">
                Short by:
              </Paragraph>

              <TextField
                select
                fullWidth
                size="small"
                variant="outlined"
                placeholder="Short by"
                defaultValue={SORT_OPTIONS[0].value}
                sx={{ flex: "1 1 0", minWidth: "150px" }}
              >
                {SORT_OPTIONS.map((item) => (
                  <MenuItem value={item.value} key={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </TextField>
            </FlexBox>

            {/*<FlexBox alignItems="center" my="0.25rem">
              <Paragraph color="grey.600" mr={1}>
                View:
              </Paragraph>

              <IconButton onClick={toggleView("grid")}>
                <Apps
                  color={view === "grid" ? "primary" : "inherit"}
                  fontSize="small"
                />
              </IconButton>

              <IconButton onClick={toggleView("list")}>
                <ViewList
                  color={view === "list" ? "primary" : "inherit"}
                  fontSize="small"
                />
              </IconButton>

              {downMd && (
                <Sidenav
                  handle={
                    <IconButton>
                      <FilterList fontSize="small" />
                    </IconButton>
                  }
                >
                  <ProductFilterCard
                    categories={parentCategories}
                    brands={brands}
                  />
                </Sidenav>
              )}
            </FlexBox>
          */}
          </FlexBox>
        )}
      </Card>

      <Grid container spacing={3}>
        {/* PRODUCT FILTER SIDEBAR AREA */}
        {products.length > 0 && (
          <Grid item md={3} sx={{ display: { md: "block", xs: "none" } }}>
            <ProductFilterCard1 categories={parentCategories} brands={brands} />
          </Grid>
        )}

        {/* PRODUCT VIEW AREA */}
        <Grid item md={9} xs={12}>
          {view === "grid" ? (
            <ProductsGridView1
              products={products}
              totalPages={totalPages}
              totalResults={totalResults}
              filters={`name=${searchText}&categoryName=${searchText}`}
            />
          ) : (
            <ProductsListView products={PRODUCTS} />
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductSearchPageView;
