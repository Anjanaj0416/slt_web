import { FC } from "react";
import Button from "@mui/material/Button";
// MUI ICON COMPONENTS
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";
// GLOBAL CUSTOM COMPONENTS
import { H5 } from "components/Typography";
import { FlexBetween, FlexBox } from "components/flex-box";
import { LoadingButton } from "@mui/lab";

// ==============================================================
interface Props {
  quantity: number;
  disabled: boolean;
  handleAddToCart: () => void;
  handleAmountChange: (quantity: number) => void;
}
// ==============================================================

const AddToCartButton: FC<Props> = ({
  disabled,
  quantity,
  handleAddToCart,
  handleAmountChange,
}) => {
  const handleIncrement = () => handleAmountChange(1);
  const handleDecrement = () => handleAmountChange(-1);
  console.log(disabled);

  return (
    <FlexBox mt={1}>
      {quantity ? (
        <FlexBetween>
          <Button
            disabled={disabled}
            color="primary"
            variant="outlined"
            sx={{ padding: "5px" }}
            onClick={handleDecrement}
          >
            <Remove fontSize="small" />
          </Button>
          <H5 fontWeight="600" fontSize="15px" mx={1.5}>
            {quantity}
          </H5>
          <Button
            disabled={disabled}
            color="primary"
            variant="outlined"
            sx={{ padding: "5px" }}
            onClick={handleIncrement}
          >
            <Add fontSize="small" />
          </Button>
        </FlexBetween>
      ) : (
        <LoadingButton
          loading={disabled}
          disabled={disabled}
          color="primary"
          variant="contained"
          sx={{ height: 32 }}
          onClick={handleAddToCart}
        >
          Add To Cart
        </LoadingButton>
      )}
    </FlexBox>
  );
};

export default AddToCartButton;
