"use client";

import { useCallback, useState } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
// GLOBAL CUSTOM COMPONENTS
import { FlexBetween, FlexBox } from "components/flex-box";
import { H5, Paragraph, Span } from "components/Typography";
import ProductsListView from "components/products-view/products-list-view";
import { Product1 } from "models/Product.model";
import Category1 from "models/Category.model";
import ProductsGridView1 from "components/products-view/products-grid-view-1";
import { Apps, ViewList } from "@mui/icons-material";
import useListProducts from "components/products-view/hook/use-list-products";
import { Pagination } from "@mui/material";
import ProductFilterCard from "../product-filter-card";

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
  categoryId?: string;
  categorySelect?: boolean;
  totalResults: number;
  initTotalPages: number;
};
// ==============================================================

const ProductSearchPageView = ({
  products,
  searchText,
  categoryId,
  totalResults,
  initTotalPages,
  categorySelect,
}: Props) => {
  const [view, setView] = useState("grid");
  const toggleView = useCallback((v: string) => () => setView(v), []);
  const [totalResult, setTotalResult] = useState(totalResults);
  const [selectedCategoryId, setSelectedCategoryId] =
    useState<string>(categoryId);
  const [brands, setBrands] = useState<string[]>();
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [sort, setSort] = useState<string>();
  const { isLoading, filteredProducts, setPage, page, totalPage } =
    useListProducts(
      products,
      searchText,
      selectedCategoryId,
      minPrice,
      maxPrice,
      brands,
      initTotalPages,
      setTotalResult,
      sort,
      categorySelect
    );

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
  };

  let parentCategories: Category1[] = [];
  // Get brands
  const brandNames = Array.from(
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
        {searchText && (
          <div>
            <H5>{`Searching for “ ${searchText} ”`}</H5>
            <Paragraph color="grey.600">
              {totalResult > 1
                ? `${totalResult} results found`
                : `${totalResult} result found`}
            </Paragraph>
          </div>
        )}

        {
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
                disabled={isLoading || products.length < 1}
                variant="outlined"
                placeholder="Short by"
                defaultValue={SORT_OPTIONS[0].value}
                sx={{ flex: "1 1 0", minWidth: "150px" }}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "Date") {
                    setSort("sort=createdAt,asc");
                  } else if (value === "Price Low to High") {
                    setSort("sort=variants.price,asc");
                  } else if (value === "Price High to Low") {
                    setSort("sort=variants.price,desc");
                  } else {
                    setSort(null);
                  }
                }}
              >
                {SORT_OPTIONS.map((item) => (
                  <MenuItem value={item.value} key={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </TextField>
            </FlexBox>

            <FlexBox
              alignItems="center"
              my="0.25rem"
              sx={{
                display: {
                  xs: "none", // hidden on mobile
                  sm: "none", // hidden on small
                  md: "flex", // visible on md and up
                },
              }}
            >
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

              {/* {downMd && (
                <Sidenav
                  handle={
                    <IconButton>
                      <FilterList fontSize="small" />
                    </IconButton>
                  }
                >
                  <ProductFilterCar
                    categories={parentCategories}
                    brands={brands}
                  />
                </Sidenav>
              )} */}
            </FlexBox>
          </FlexBox>
        }
      </Card>

      <Grid container spacing={3}>
        {/* PRODUCT FILTER SIDEBAR AREA */}
        {
          <Grid item md={3} sx={{ display: { md: "block", xs: "none" } }}>
            {/* <ProductFilterCard1
              filters={
                categoryId
                  ? categorySelect
                    ? `categoryId=${categoryId}`
                    : `name=${searchText}&categoryId=${categoryId}`
                  : `name=${searchText}`
              }
              setFilters={setFilters}
              categories={parentCategories}
              brands={brands}
            /> */}
            <ProductFilterCard
              categoryId={selectedCategoryId}
              setSelectedCategoryId={setSelectedCategoryId}
              categories={parentCategories}
              setPage={setPage}
              setBrands={setBrands}
              brands={brandNames}
              isLoading={isLoading || products.length < 1}
              setMaxPrice={setMaxPrice}
              setMinPrice={setMinPrice}
            />
          </Grid>
        }

        {/* PRODUCT VIEW AREA */}
        <Grid item md={9} xs={12}>
          {view === "grid" ? (
            <ProductsGridView1
              products={filteredProducts}
              isLoading={isLoading}
            />
          ) : (
            <ProductsListView
              products={filteredProducts}
              isLoading={isLoading}
            />
          )}
          {filteredProducts.length > 1 && !isLoading && (
            <FlexBetween justifyContent="end" flexWrap="wrap" mt={4}>
              <Pagination
                count={totalPage}
                variant="outlined"
                color="primary"
                onChange={handleChange}
              />
            </FlexBetween>
          )}
          {!searchText && products.length < 1 && !isLoading && (
            <div style={{ padding: 4, marginTop: 50 }}>
              <H5>There are no products !</H5>
            </div>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductSearchPageView;
