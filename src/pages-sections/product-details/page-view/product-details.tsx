"use client";

import Container from "@mui/material/Container";
// Local CUSTOM COMPONENTS
import ProductTabs from "../product-tabs";
import AvailableShops from "../available-shops";
import RelatedProducts from "../related-products";
// CUSTOM DATA MODEL
import ProductIntro1 from "../product-intro1";
import Store from "models/Store.model";
import { Product1 } from "models/Product.model";
import { useFilteredProductsQuery } from "services/product-api";
import { Box, CircularProgress } from "@mui/material";

// ==============================================================
interface Props {
  product: Product1;
  stores: Store[];
  ownerStore: Store;
  frequentlyBought?: Product1[];
}
// ==============================================================

const ProductDetailsPageView = ({ product, stores, ownerStore }: Props) => {
  const {
    data: products,
    error,
    isLoading: isLoadingRelated,
  } = useFilteredProductsQuery({ categoryId: product.category.id, size: 5 });
  const relatedProducts = (products?.data ?? [])
    .filter((p: Product1) => p.id !== product.id)
    .slice(0, 4);
  return (
    <Box sx={{ my: 4, px: { xs: 2, md: 16 } }}>
      {/* PRODUCT DETAILS INFO AREA */}
      <ProductIntro1 product={product} store={ownerStore} />

      {/* PRODUCT DESCRIPTION AND REVIEW */}
      <ProductTabs
        description={product.description}
        specification={product.specification}
        productId={product.id}
      />

      {/* FREQUENTLY BOUGHT PRODUCTS AREA */}
      {/* <FrequentlyBought products={props.frequentlyBought} /> */}

      {/* AVAILABLE SHOPS AREA */}
      {stores.length > 0 && <AvailableShops stores={stores} />}

      {/* RELATED PRODUCTS AREA */}
      {isLoadingRelated ? (
        <CircularProgress />
      ) : (
        relatedProducts?.length > 0 && (
          <RelatedProducts products={relatedProducts} />
        )
      )}
    </Box>
  );
};

export default ProductDetailsPageView;
