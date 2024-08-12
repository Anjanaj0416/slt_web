import { FC, Fragment } from "react";
import Grid from "@mui/material/Grid";
// CUSTOM DATA MODEL
import { Product1 } from "models/Product.model";
import { ProductCard10 } from "components/product-cards/product-card-10";
import Loading from "app/loading";

// ========================================================
type Props = {
  products: Product1[];
  isLoading: boolean;
};
// ========================================================

const ProductsGridView1: FC<Props> = ({ products, isLoading }) => {
  return (
    <Fragment>
      {isLoading ? (
        <Loading />
      ) : (
        <Grid container spacing={3}>
          {products.map((product: Product1) => (
            <Grid item lg={4} sm={6} xs={12} key={product.id}>
              <ProductCard10 product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Fragment>
  );
};

export default ProductsGridView1;
