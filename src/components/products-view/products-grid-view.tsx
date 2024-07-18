import { FC, Fragment } from "react";
import Grid from "@mui/material/Grid";
// CUSTOM DATA MODEL
import { Product1 } from "models/Product.model";
import { ProductCard10 } from "components/product-cards/product-card-10";

// ========================================================
type Props = { products: Product1[] };
// ========================================================

const ProductsGridView: FC<Props> = ({ products }) => {
  return (
    <Fragment>
      <Grid container spacing={3} marginTop={1}>
        {products.map((product: Product1) => (
          <Grid item lg={4} sm={6} xs={12} key={product.id}>
            <ProductCard10 product={product} />
          </Grid>
        ))}
      </Grid>
    </Fragment>
  );
};

export default ProductsGridView;
