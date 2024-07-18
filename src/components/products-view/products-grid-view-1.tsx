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
import useListProducts from "./hook/use-list-products";
import { LinearProgress } from "@mui/material";
import Loading from "app/loading";

// ========================================================
type Props = {
  products: Product1[];
  initTotalPages: number;
  totalResult: number;
  filters: string;
  setTotalResult: (value: number) => void;
};
// ========================================================

const ProductsGridView1: FC<Props> = ({
  products,
  initTotalPages,
  totalResult,
  setTotalResult,
  filters,
}) => {
  const { isLoading, filteredProducts, setPage, page, totalPage } =
    useListProducts(products, filters, initTotalPages, setTotalResult);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
  };

  return (
    <Fragment>
      {isLoading ? (
        <Loading />
      ) : (
        <Grid container spacing={3}>
          {filteredProducts.map((product: Product1) => (
            <Grid item lg={4} sm={6} xs={12} key={product.id}>
              <ProductCard10 product={product} />
            </Grid>
          ))}
        </Grid>
      )}

      {filteredProducts.length > 1 && !isLoading && (
        <FlexBetween flexWrap="wrap" mt={4}>
          <Span color="grey.600">{`Showing ${page ? page * 9 + 1 : 1}-${
            page ? (page + 1 === totalPage ? totalResult : page * 9 + 9) : 9
          } of ${totalResult} Products`}</Span>

          <Pagination
            count={totalPage}
            variant="outlined"
            color="primary"
            onChange={handleChange}
          />
        </FlexBetween>
      )}
    </Fragment>
  );
};

export default ProductsGridView1;
