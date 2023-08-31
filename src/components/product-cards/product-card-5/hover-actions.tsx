import { FC } from "react";
import Divider from "@mui/material/Divider";
import { Favorite, FavoriteBorder, AddShoppingCart, RemoveRedEye } from "@mui/icons-material";

import { Span } from "components/Typography";
import { HoverWrapper } from "./styles";

// ==============================================================
interface Props {
  isFavorite: boolean;
  toggleView: () => void;
  toggleFavorite: () => void;
  handleIncrementQuantity: () => void;
}
// ==============================================================

const HoverActions: FC<Props> = ({
  isFavorite,
  toggleView,
  toggleFavorite,
  handleIncrementQuantity,
}) => {
  return (
    <HoverWrapper className="controller">
      <Span onClick={toggleView}>
        <RemoveRedEye />
      </Span>

      <Divider orientation="horizontal" flexItem />

      <Span onClick={toggleFavorite}>
        {isFavorite ? (
          <Favorite color="primary" fontSize="small" />
        ) : (
          <FavoriteBorder fontSize="small" color="primary" />
        )}
      </Span>

      <Divider orientation="horizontal" flexItem />

      <Span onClick={handleIncrementQuantity}>
        <AddShoppingCart />
      </Span>
    </HoverWrapper>
  );
};

export default HoverActions;
