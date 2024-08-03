import Container from "@mui/material/Container";
// Local CUSTOM COMPONENTS
import ProductTabs from "../product-tabs";
import AvailableShops from "../available-shops";
import RelatedProducts from "../related-products";
// CUSTOM DATA MODEL
import Product, { Product1 } from "models/Product.model";
import ProductIntro1 from "../product-intro1";
import Store from "models/Store.model";

// ==============================================================
interface Props {
  product: Product1;
  stores: Store[];
  relatedProducts: Product1[];
  frequentlyBought?: Product[];
}
// ==============================================================

const ProductDetailsPageView = ({
  product,
  relatedProducts,
  stores,
}: Props) => {
  return (
    <Container sx={{ my: 4 }}>
      {/* PRODUCT DETAILS INFO AREA */}
      <ProductIntro1 product={product} />

      {/* PRODUCT DESCRIPTION AND REVIEW */}
      <ProductTabs
        description={product.description}
        specification={product.specification}
      />

      {/* FREQUENTLY BOUGHT PRODUCTS AREA */}
      {/* <FrequentlyBought products={props.frequentlyBought} /> */}

      {/* AVAILABLE SHOPS AREA */}
      <AvailableShops stores={stores} />

      {/* RELATED PRODUCTS AREA */}
      <RelatedProducts products={relatedProducts} />
    </Container>
  );
};

export default ProductDetailsPageView;
