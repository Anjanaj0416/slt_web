import { FC } from "react";
import Rating from "@mui/material/Rating";
// GLOBAL CUSTOM COMPONENTS
import { Span } from "components/Typography";
import { FlexBox } from "components/flex-box";

// ==============================================================
interface Props {
  rating: number;
  showRating: boolean;
}
// ==============================================================

const ProductRating: FC<Props> = ({ showRating, rating = 0 }) => {
  return showRating ? (
    <FlexBox gap={1} alignItems="center">
      <Rating size="small" value={rating} color="warn" readOnly />
      <Span color="grey.600">({rating})</Span>
    </FlexBox>
  ) : null;
};

export default ProductRating;
