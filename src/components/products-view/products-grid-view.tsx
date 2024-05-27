import { FC, Fragment } from "react";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
// GLOBAL CUSTOM COMPONENTS
import { Span } from "components/Typography";
import { FlexBetween } from "components/flex-box";
import ProductCard1 from "components/product-cards/product-card-1";
// CUSTOM DATA MODEL
import { Product1 } from "models/Product.model";
import { ProductCard10 } from "components/product-cards/product-card-10";

// ========================================================
type Props = { products: Product1[] };
// ========================================================

const ProductsGridView: FC<Props> = ({ products }) => {
  return (
    <Fragment>
      <Grid container spacing={3}>
        {products.map((product: Product1) => (
          <Grid item lg={4} sm={6} xs={12} key={product.id}>
            <ProductCard10 product={product} />
          </Grid>
        ))}
      </Grid>

      <FlexBetween flexWrap="wrap" mt={4}>
        <Span color="grey.600">Showing 1-9 of 1.3k Products</Span>
        <Pagination
          count={Math.ceil(products.length / 10)}
          variant="outlined"
          color="primary"
        />
      </FlexBetween>
    </Fragment>
  );
};

export default ProductsGridView;
