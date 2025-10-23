import { Box, CircularProgress } from "@mui/material";
import { H2 } from "components/Typography";
import { currency } from "lib";

interface Props {
  price?: number | string;
  discountedPrice?: number;
  discountAmount?: number;
  quantity?: number;
  selectedUnits: number;
}

const PriceSection = ({
  price,
  discountedPrice,
  discountAmount,
  quantity,
  selectedUnits,
}: Props) => (
  <Box pt={1} mb={3}>
    {price && (
      <H2 color="primary.main" mb={0.5}>
        {typeof price === "number"
          ? currency(
              (discountAmount ? discountedPrice : Number(price)) * selectedUnits
            )
          : `LKR ${price}`}
      </H2>
    )}
    {discountAmount && discountedPrice && price ? (
      <Box component="del" fontWeight={600} color="grey.600" fontSize={20}>
        {currency(price)}
      </Box>
    ) : (
      ""
    )}
    {quantity !== undefined && (
      <Box>{quantity > 0 ? "Stock Available" : "Out of Stock"}</Box>
    )}
  </Box>
);

export default PriceSection;
