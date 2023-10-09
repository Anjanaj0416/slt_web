import { ChangeEvent, FC } from "react";
import Pagination from "@mui/material/Pagination";
// CUSTOM GLOBAL COMPONENTS
import { Span } from "components/Typography";
import { FlexBetween } from "components/flex-box";
// CUSTOM UTILITY FUNCTION
import { renderProductCount } from "lib";

// ==============================================================
interface Props {
  page: number;
  perPage: number;
  totalProducts: number;
  handlePageChange: (e: ChangeEvent<unknown>, page: number) => void;
}
// ==============================================================

const ProductPagination: FC<Props> = ({
  page,
  perPage,
  totalProducts,
  handlePageChange,
}) => {
  return (
    <FlexBetween flexWrap="wrap" my={8}>
      <Span>{renderProductCount(page, perPage, totalProducts)}</Span>

      <Pagination
        page={page}
        color="primary"
        variant="outlined"
        onChange={handlePageChange}
        count={Math.ceil(totalProducts / perPage)}
      />
    </FlexBetween>
  );
};

export default ProductPagination;
