import { FC } from "react";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import {
  Add,
  Remove,
  Favorite,
  RemoveRedEye,
  FavoriteBorder,
  AddShoppingCart,
} from "@mui/icons-material";
// GLOBAL CUSTOM COMPONENT
import { Span } from "components/Typography";
// STYLED COMPONENTS
import { HoverButtonBox, ItemController } from "./styles";

// ==============================================================
interface Props {
  hasQty: boolean;
  isFavorite: boolean;
  toggleDialog: () => void;
  toggleFavorite: () => void;
  handleAddToCart: () => void;
  handleRemoveFormCart: () => void;
}
// ==============================================================

const HoverActions: FC<Props> = (props) => {
  const {
    hasQty,
    isFavorite,
    toggleDialog,
    toggleFavorite,
    handleAddToCart,
    handleRemoveFormCart,
  } = props;

  return (
    <HoverButtonBox className="hoverButtonBox">
      <div className="buttonBox">
        <ItemController>
          <Span onClick={toggleDialog}>
            <RemoveRedEye />
          </Span>

          <Divider orientation="vertical" flexItem />

          <Span onClick={toggleFavorite}>
            {isFavorite ? (
              <Favorite color="primary" fontSize="small" />
            ) : (
              <FavoriteBorder color="primary" fontSize="small" />
            )}
          </Span>

          <Divider orientation="vertical" flexItem />

          <Span onClick={handleAddToCart}>
            <AddShoppingCart />
          </Span>
        </ItemController>

        {hasQty ? (
          <Button
            color="primary"
            variant="outlined"
            className="addCartButton"
            onClick={handleRemoveFormCart}
          >
            <Remove /> Remove from Cart
          </Button>
        ) : (
          <Button
            color="primary"
            variant="outlined"
            className="addCartButton"
            onClick={handleAddToCart}
          >
            <Add /> Add to Cart
          </Button>
        )}
      </div>
    </HoverButtonBox>
  );
};

export default HoverActions;
