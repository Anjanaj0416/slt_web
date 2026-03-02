"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { Box, CircularProgress } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // MUI v5 Grid2
import Image from "next/image";
import { H2, H3, H4 } from "components/Typography";
import { ProductCard10 } from "components/product-cards/product-card-10";
import { useLazyListProductsQuery } from "services/product-api";
import { Product1 } from "models/Product.model";
import ENVIRONMENT from "config/environment";
import { FlexBox } from "components/flex-box";
import { shuffle } from "utils/shuffle";
import ProductCardSkeleton from "./product-card-skeleton";

const PAGE_SIZE = 20;

const AllProducts = () => {
  const [products, setProducts] = useState<Product1[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [fetchProducts, { isFetching }] = useLazyListProductsQuery();
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const isLoadingRef = useRef(false);

  const loadProducts = useCallback(async () => {
    if (isLoadingRef.current || !hasMore) return;

    try {
      isLoadingRef.current = true;

      const response = await fetchProducts({
        page,
        size: PAGE_SIZE,
      }).unwrap();

      const newProducts: Product1[] = response?.data || [];

      if (newProducts.length < PAGE_SIZE) {
        setHasMore(false);
      }

      if (newProducts.length > 0) {
        setProducts((prev) => {
          const map = new Map<string, Product1>();
          [...prev, ...shuffle(newProducts)].forEach((p) => map.set(p.id, p));
          return Array.from(map.values());
        });
      }
    } finally {
      isLoadingRef.current = false;
    }
  }, [page, hasMore, fetchProducts]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetching && !isLoadingRef.current) {
          setPage((prev) => prev + 1);
        }
      },
      { rootMargin: "200px" }
    );

    const current = loaderRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
      observer.disconnect();
    };
  }, [hasMore, isFetching]);

  return (
    <Box>
      <H2 mb={3} mt={2}>
        Explore Products
      </H2>

      {/* Initial Loading */}
      {isFetching && page === 0 ? (
        <FlexBox justifyContent="center" py={6}>
          <ProductCardSkeleton />
        </FlexBox>
      ) : products.length === 0 ? (
        <FlexBox
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          py={6}
        >
          <Image
            width={180}
            height={180}
            alt="No Products"
            src={`${ENVIRONMENT.APP_URL}/assets/images/empty-box.png`}
          />
          <H4 mt={3}>There are no products!</H4>
        </FlexBox>
      ) : (
        <Grid container spacing={{ xs: 1.5, sm: 1, md: 1.5 }}>
          {products.map((product) => (
            <Grid
              key={product.id}
              xs={6} // 2 columns mobile
              sm={4} // 3 columns
              md={3} // 4 columns
              lg={2.4} // 5 columns (12 / 2.4 = 5)
            >
              <ProductCard10 product={product} />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Infinite Loader */}
      {hasMore && products.length > 0 && (
        <Box ref={loaderRef} display="flex" justifyContent="center" mt={5}>
          <ProductCardSkeleton />
        </Box>
      )}
    </Box>
  );
};

export default AllProducts;
