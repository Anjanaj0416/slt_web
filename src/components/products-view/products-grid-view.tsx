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
import useListProducts from "./use-list-products";

// ========================================================
type Props = {
  products: Product1[];
  totalPages: number;
  totalResults: number;
  filters: string;
};
// ========================================================

const ProductsGridView: FC<Props> = ({
  products,
  totalPages,
  totalResults,
  filters,
}) => {
  const { isLoading, filteredProducts, setPage, page, totalPage } =
    useListProducts(products, filters);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
  };
  return (
    <Fragment>
      <Grid container spacing={3}>
        {filteredProducts.map((product: Product1) => (
          <Grid item lg={4} sm={6} xs={12} key={product.id}>
            <ProductCard10 product={product} />
          </Grid>
        ))}
      </Grid>

      {products.length > 1 && (
        <FlexBetween flexWrap="wrap" mt={4}>
          {!isLoading && (
            <Span color="grey.600">{`Showing ${page ? page * 9 + 1 : 1}-${
              page ? (page + 1 === totalPage ? totalResults : page * 9 + 9) : 9
            } of ${totalResults} Products`}</Span>
          )}
          <Pagination
            count={page ? totalPage : totalPages}
            variant="outlined"
            color="primary"
            onChange={handleChange}
          />
        </FlexBetween>
      )}
    </Fragment>
  );
};

export default ProductsGridView;
