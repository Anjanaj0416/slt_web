"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { Box, CircularProgress } from "@mui/material";
import Image from "next/image";
import { H3, H4 } from "components/Typography";
import { ProductCard10 } from "components/product-cards/product-card-10";
import { useLazyListProductsQuery } from "services/product-api";
import { Product1 } from "models/Product.model";
import ENVIRONMENT from "config/environment";
import { FlexBox } from "components/flex-box";
import Banner from "models/Banner.model";
import FullBanner from "./full-banner";
import HalfBanner from "./half-banner";
import { shuffle } from "utils/shuffle";

const PAGE_SIZE = 10;

const getColumnCount = () => {
  if (typeof window !== "undefined") {
    const width = window.innerWidth;
    if (width >= 1858) return 5; // xl
    if (width >= 1287) return 5; // lg
    if (width >= 900) return 3; // md
    return 2; // xs
  }
  return 2;
};

type Props = {
  fullBanners: Banner[];
  halfBanners: Banner[];
};
const AllProducts = ({ fullBanners = [], halfBanners = [] }: Props) => {
  const [products, setProducts] = useState<Product1[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [fetchProducts, { isFetching }] = useLazyListProductsQuery();
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const loadProducts = useCallback(async () => {
    const response = await fetchProducts({ page, size: PAGE_SIZE }).unwrap();
    const newProducts: Product1[] = response?.data || [];

    if (newProducts.length < PAGE_SIZE) {
      setHasMore(false); // No more pages
    }

    if (newProducts?.length) {
      setProducts((prevState) => {
        // Create a Map to ensure uniqueness based on product.id
        const shuffledNew = shuffle([...newProducts]);
        const combined = [...prevState, ...shuffledNew];
        const uniqueProductsMap = new Map<string, Product1>();

        combined.forEach((product) => {
          uniqueProductsMap.set(product.id, product);
        });

        return Array.from(uniqueProductsMap.values());
      });
    }
  }, [page, fetchProducts]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Intersection Observer to trigger loading
  useEffect(() => {
    if (!hasMore) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetching) {
          setPage((prev) => prev + 1);
        }
      },
      {
        root: null,
        rootMargin: "10px",
        threshold: 0.1,
      }
    );
    const currentLoader = loaderRef.current;
    if (currentLoader) observer.observe(currentLoader);

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [hasMore, isFetching]);

  const columnCount = getColumnCount();

  const itemsWithImages = [];
  let isFullBannerAdded = false;
  let fullBannerIndex = 0;
  let halfBannerIndex = 0;
  products.forEach((product, index) => {
    itemsWithImages.push(
      <Box key={product.id}>
        <ProductCard10 product={product} />
      </Box>
    );

    const isEndOfRow = (index + 1) % columnCount === 0;
    const isEvenRow = ((index + 1) / columnCount) % 2 === 0;
    //
    if (isEndOfRow && isEvenRow && fullBanners.length > 0) {
      if (!isFullBannerAdded) {
        itemsWithImages.push(
          <Box
            key={`banner-${index}`}
            sx={{
              gridColumn: `1 / -1`, // spans the full row
              display: "flex",
              justifyContent: "center",
              mt: 2,
            }}
          >
            <FullBanner data={fullBanners?.[fullBannerIndex]} />
          </Box>
        );
        if (fullBannerIndex === fullBanners.length - 1) {
          fullBannerIndex = 0;
        } else {
          ++fullBannerIndex;
        }
        if (halfBanners.length > 0) {
          isFullBannerAdded = true;
        }
      } else if (halfBanners.length > 0) {
        itemsWithImages.push(
          <Box
            key={`banner-${index}`}
            sx={{
              gridColumn: `1 / -1`, // spans the full row
              display: "flex",
              justifyContent: "center",
            }}
          >
            <HalfBanner
              data={[
                halfBanners?.[halfBannerIndex],
                halfBanners?.[halfBannerIndex + 1],
              ]}
            />
          </Box>
        );
        if (halfBannerIndex === halfBanners.length - 2) {
          halfBannerIndex = 0;
        } else {
          halfBannerIndex += 2;
        }
        if (fullBanners.length > 0) {
          isFullBannerAdded = false;
        }
      }
    }
  });

  return (
    <Box>
      <H3 sx={{ pb: 2 }}>All Products</H3>
      {isFetching && page === 0 ? (
        <CircularProgress />
      ) : products.length < 1 ? (
        <FlexBox
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Image
            width={200}
            height={200}
            alt="No Products"
            src={`${ENVIRONMENT.APP_URL}/assets/images/empty-box.png`}
            className="product-img"
          />
          <H4 mt={3}>There are no products!</H4>
        </FlexBox>
      ) : (
        <Box
          sx={{
            display: "grid",
            gap: { xs: 1, md: 1, lg: 1 },
            gridTemplateColumns: {
              xs: "repeat(2, minmax(150px, 1fr))",
              sm: "repeat(3, minmax(150px, 1fr))",
              md: "repeat(4, 1fr)",
              lg: "repeat(5, 1fr)",
            },
          }}
        >
          {itemsWithImages}
        </Box>
      )}

      {/* Loader for intersection observer */}
      {hasMore && (
        <Box
          ref={loaderRef}
          sx={{ display: "flex", justifyContent: "center", mt: 4 }}
        >
          <CircularProgress size={28} />
        </Box>
      )}
    </Box>
  );
};

export default AllProducts;
