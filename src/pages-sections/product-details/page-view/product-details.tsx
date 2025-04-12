import Container from "@mui/material/Container";
// Local CUSTOM COMPONENTS
import ProductTabs from "../product-tabs";
import AvailableShops from "../available-shops";
import RelatedProducts from "../related-products";
// CUSTOM DATA MODEL
import ProductIntro1 from "../product-intro1";
import Store from "models/Store.model";
import { Product1 } from "models/Product.model";

// ==============================================================
interface Props {
  product: Product1;
  stores: Store[];
  ownerStore: Store;
  relatedProducts: Product1[];
  frequentlyBought?: Product1[];
}
// ==============================================================

const ProductDetailsPageView = ({
  product,
  relatedProducts,
  stores,
  ownerStore,
}: Props) => {
  return (
    <Container sx={{ my: 4 }}>
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
      {relatedProducts?.length > 0 && (
        <RelatedProducts products={relatedProducts} />
      )}
    </Container>
  );
};

export default ProductDetailsPageView;
