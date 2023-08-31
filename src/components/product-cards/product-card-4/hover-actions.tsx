import { FC } from "react";
import { Favorite, RemoveRedEye, FavoriteBorder, ShoppingCart } from "@mui/icons-material";
// GLOBAL CUSTOM COMPONENT
import { Span } from "components/Typography";
// STYLED COMPONENT
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

      <Span
        onClick={toggleFavorite}
        sx={{ borderLeft: "1px solid", borderRight: "1px solid", borderColor: "grey.300" }}
      >
        {isFavorite ? (
          <Favorite color="primary" fontSize="small" />
        ) : (
          <FavoriteBorder fontSize="small" color="disabled" />
        )}
      </Span>

      <Span onClick={handleIncrementQuantity}>
        <ShoppingCart />
      </Span>
    </HoverWrapper>
  );
};

export default HoverActions;
