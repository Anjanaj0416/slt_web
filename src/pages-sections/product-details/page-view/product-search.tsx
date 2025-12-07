"use client";

import { useCallback, useMemo, useState } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import { Box, Pagination, useTheme } from "@mui/material";
import { Apps, ViewList } from "@mui/icons-material";
import Link from "next/link";

// GLOBAL CUSTOM COMPONENTS
import { FlexBetween, FlexBox } from "components/flex-box";
import { H5, Paragraph } from "components/Typography";
import ProductsListView from "components/products-view/products-list-view";
import ProductsGridView1 from "components/products-view/products-grid-view-1";
import useListProducts from "components/products-view/hook/use-list-products";
import ProductFilterCard from "../product-filter-card";
import { Carousel } from "components/carousel";
import { COMMON_DOT_STYLES } from "components/carousel/styles";
import CarouselCard5 from "components/carousel-cards/carousel-card-5";

import ENVIRONMENT from "config/environment";

// Models (types)
import { Product1 } from "models/Product.model";
import Category1 from "models/Category.model";
import Banner from "models/Banner.model";

const SORT_OPTIONS = [
  { label: "Relevance", value: "Relevance" },
  { label: "Date", value: "Date" },
  { label: "Price Low to High", value: "Price Low to High" },
  { label: "Price High to Low", value: "Price High to Low" },
] as const;

const SORT_MAP: Record<string, string | null> = {
  Date: "sort=createdAt,asc",
  "Price Low to High": "sort=variants.price,asc",
  "Price High to Low": "sort=variants.price,desc",
  Relevance: null,
};

function shuffle<T>(arr: T[]) {
  // non-mutating shuffle
  const array = arr.slice();
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function getResponsiveImageUrls(imageUrl = "") {
  // keep captured extension and replace with suffix
  const m = imageUrl.match(/(.*)\.(png|jpe?g|webp)$/i);
  if (!m) return { tabletImage: imageUrl, mobileImage: imageUrl };
  const [, base, ext] = m;
  return {
    tabletImage: `${base}_tablet.${ext}`,
    mobileImage: `${base}_mobile.${ext}`,
  };
}

// ==============================================================
type Props = {
  products: Product1[];
  searchText: string;
  categoryId?: string;
  categorySelect?: boolean;
  totalResults: number;
  initTotalPages: number;
  banners?: Banner[];
};
// ==============================================================

export default function ProductSearchPageView({
  products = [],
  searchText = "",
  categoryId,
  totalResults,
  initTotalPages,
  categorySelect,
  banners,
}: Props) {
  const [view, setView] = useState<"grid" | "list">("grid");
  const toggleView = useCallback((v: "grid" | "list") => () => setView(v), []);

  const [totalResult, setTotalResult] = useState<number>(totalResults ?? 0);
  const [selectedCategoryId, setCategoryId] = useState<string | undefined>(
    categoryId
  );
  const [brands, setBrands] = useState<string[] | undefined>(undefined);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [sort, setSort] = useState<string | null>(null);

  const { palette } = useTheme();

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

  const handlePageChange = useCallback(
    (_: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
    },
    [setPage]
  );

  // memoize derived data
  const brandNames = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.brand))).slice(0, 5);
  }, [products]);

  // Build parent categories map -> array (de-duplicate + gather subcategories)
  const parentCategories = useMemo(() => {
    const map = new Map<string, Category1 & { subCategories: Category1[] }>();

    for (const product of products) {
      const cat = product.category;
      const parent = cat.parentCategory ?? cat;
      const parentId = parent.id;

      if (!map.has(parentId)) {
        // clone parent and ensure subCategories exists
        map.set(parentId, {
          ...parent,
          subCategories: Array.isArray(parent.subCategories)
            ? [...parent.subCategories]
            : [],
        });
      }

      // if original category is a child, add it as sub
      if (cat.parentCategory) {
        const child = { ...cat, parentCategory: null } as Category1;
        const entry = map.get(parentId) as Category1 & {
          subCategories: Category1[];
        };
        if (!entry.subCategories.some((c) => c.id === child.id))
          entry.subCategories.push(child);
      }
    }

    return Array.from(map.values());
  }, [products]);

  // shuffle filtered products only when filteredProducts changes
  const shuffledProducts = useMemo(
    () => shuffle(filteredProducts || []),
    [filteredProducts]
  );

  return (
    <Box sx={{ mt: 4, mb: 6, px: { xs: 2, md: 16 } }}>
      <Grid item md={9} xs={12} mb={1}>
        {banners && banners.length > 0 && (
          <Carousel
            dots
            arrows={false}
            spaceBetween={0}
            slidesToShow={1}
            autoplay
            dotColor={palette.dark?.main}
            dotStyles={COMMON_DOT_STYLES}
          >
            {banners.map((item) => {
              const url = `${ENVIRONMENT.S3_BUCKET_URL}/${item.imageUrl}`;
              const { tabletImage, mobileImage } = getResponsiveImageUrls(url);
              return (
                <Link key={item.id} href={item.link} target="_blank">
                  <CarouselCard5
                    mode="light"
                    bgImage={url}
                    bgImageTablet={tabletImage}
                    bgImageMobile={mobileImage}
                  />
                </Link>
              );
            })}
          </Carousel>
        )}

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

          <FlexBox
            alignItems="center"
            columnGap={4}
            flexWrap="wrap"
            my="0.5rem"
          >
            <FlexBox alignItems="center" gap={1} flex="1 1 0">
              <Paragraph color="grey.600" whiteSpace="pre">
                Sort by:
              </Paragraph>

              <TextField
                select
                fullWidth
                size="small"
                disabled={isLoading || products.length < 1}
                variant="outlined"
                defaultValue={SORT_OPTIONS[0].value}
                sx={{ flex: "1 1 0", minWidth: "150px" }}
                onChange={(e) =>
                  setSort(
                    SORT_MAP[(e.target as HTMLInputElement).value] ?? null
                  )
                }
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
              sx={{ display: { xs: "none", sm: "none", md: "flex" } }}
            >
              {/* <Paragraph color="grey.600" mr={1}>
                View:
              </Paragraph>

              <IconButton onClick={toggleView("grid")} aria-label="grid view">
                <Apps
                  color={view === "grid" ? "primary" : "inherit"}
                  fontSize="small"
                />
              </IconButton> */}

              {/* <IconButton onClick={toggleView("list")} aria-label="list view">
                <ViewList
                  color={view === "list" ? "primary" : "inherit"}
                  fontSize="small"
                />
              </IconButton> */}
            </FlexBox>
          </FlexBox>
        </Card>
      </Grid>

      <Grid container spacing={3}>
        <Grid item md={3} sx={{ display: { md: "block", xs: "none" } }}>
          <ProductFilterCard
            categoryId={selectedCategoryId}
            setCategoryId={setCategoryId}
            categories={parentCategories}
            setPage={setPage}
            setBrands={setBrands}
            brands={brandNames}
            isLoading={isLoading || products.length < 1}
            setMaxPrice={setMaxPrice}
            setMinPrice={setMinPrice}
          />
        </Grid>

        <Grid item md={9} xs={12}>
          {view === "grid" ? (
            <ProductsGridView1
              products={shuffledProducts}
              isLoading={isLoading}
            />
          ) : (
            <ProductsListView
              products={shuffledProducts}
              isLoading={isLoading}
            />
          )}

          {shuffledProducts.length > 1 && !isLoading && (
            <FlexBetween justifyContent="end" flexWrap="wrap" mt={4}>
              <Pagination
                count={totalPage}
                variant="outlined"
                color="primary"
                onChange={handlePageChange}
                page={page || page === 0 ? page : 1}
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
    </Box>
  );
}
