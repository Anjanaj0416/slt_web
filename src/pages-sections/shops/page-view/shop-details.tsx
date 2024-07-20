"use client";

import Grid from "@mui/material/Grid";
import { Theme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import FilterList from "@mui/icons-material/FilterList";
// GLOBAL CUSTOM COMPONENTS
import { SideNav } from "components/side-nav";
import ProductsGridView from "components/products-view/products-grid-view";
// Local CUSTOM COMPONENTS

import ProductFilterCard from "../../product-details/product-filter-card";
// CUSTOM DATA MODEL
import Store from "models/Store.model";
import { Product1 } from "models/Product.model";
import ShopIntroCard from "../shop-intro-card";
import { FlexBetween } from "components/flex-box";
import { Span } from "components/Typography";
import { CircularProgress, Pagination } from "@mui/material";
import useListStoreProducts from "./hooks/use-list-store-products";
import Category1 from "models/Category.model";
import { useState } from "react";

// ============================================================
type Props = { store: Store; productsData: Page<Product1> };
// ============================================================
const PAGE_SIZE = 9;
// ============================================================
const ShopDetailsPageView = ({ store, productsData }: Props) => {
  const { data: products, totalResults } = productsData;
  const [categoryId, setCategoryId] = useState<string>();
  const [brands, setBrands] = useState<string[]>();
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const { productList, page, setPage, isLoading, totalResult, totalPage } =
    useListStoreProducts(
      store.id,
      categoryId,
      minPrice,
      maxPrice,
      brands,
      products,
      productsData.totalPages,
      PAGE_SIZE,
      totalResults
    );

  const isDownMd = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
  };

  const resultMinRange = page * PAGE_SIZE + 1;
  const resultMaxRange = (page + 1) * PAGE_SIZE;

  const ICON_BUTTON = (
    <IconButton sx={{ float: "right" }}>
      <FilterList fontSize="small" />
    </IconButton>
  );

  let parentCategories: Category1[] = [];
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

  // Get brands
  const brandNames = Array.from(
    new Set(products.map((product) => product.brand))
  ).slice(0, 5);

  return (
    <Container sx={{ mt: 4, mb: 6 }}>
      {/* SHOP INTRODUCTION AREA */}
      <ShopIntroCard
        name={store.name}
        phone={store.telephone}
        address={store.address}
        socialLinks={store.socialLinks}
        logoImage={store.logoFilePath}
      />

      <Grid container spacing={3}>
        {/* SIDEBAR AREA */}
        <Grid item md={3} xs={12} sx={{ display: { md: "block", xs: "none" } }}>
          <ProductFilterCard
            categoryId={categoryId}
            setCategoryId={setCategoryId}
            categories={parentCategories}
            setPage={setPage}
            setBrands={setBrands}
            brands={brandNames}
            setMaxPrice={setMaxPrice}
            setMinPrice={setMinPrice}
          />
        </Grid>

        <Grid item md={9} xs={12}>
          {/* SMALL DEVICE SIDEBAR AREA */}
          {isDownMd && (
            <SideNav position="left" handle={ICON_BUTTON}>
              <ProductFilterCard
                categoryId={categoryId}
                setCategoryId={setCategoryId}
                categories={parentCategories}
                setPage={setPage}
                setBrands={setBrands}
                setMaxPrice={setMaxPrice}
                setMinPrice={setMinPrice}
                brands={brandNames}
              />
            </SideNav>
          )}

          {/* PRODUCT LIST AREA */}
          {isLoading ? (
            <CircularProgress />
          ) : (
            <ProductsGridView products={productList} />
          )}
          {productList.length > 0 && (
            <FlexBetween flexWrap="wrap" mt={4}>
              <Span color="grey.600">
                {totalResult === resultMinRange
                  ? `Showing ${totalResult} of ${totalResult} Products`
                  : `Showing ${resultMinRange}-${
                      resultMaxRange > totalResult
                        ? totalResult
                        : resultMaxRange
                    } of ${totalResult} Products`}
              </Span>
              <Pagination
                page={page + 1}
                count={totalPage}
                onChange={handleChange}
                variant="outlined"
                color="primary"
              />
            </FlexBetween>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ShopDetailsPageView;
