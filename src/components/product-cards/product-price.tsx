import { FC } from "react";
import Box from "@mui/material/Box";
// GLOBAL CUSTOM COMPONENTS
import { FlexBox } from "components/flex-box";
import { Paragraph } from "components/Typography";
// CUSTOM UTILS LIBRARY FUNCTIONS
import { calculateDiscountPrice, currency } from "lib";

// ==============================================================
type Props = { price: number | string; discount: number };
// ==============================================================

const ProductPrice: FC<Props> = ({ discount, price }) => {
  return (
    <FlexBox alignItems="center" gap={1} mt={0.5}>
      <Paragraph fontWeight={600} color="primary.main">
        {typeof price === "number"
          ? calculateDiscountPrice(price, discount)
          : price}
      </Paragraph>

      {discount ? (
        <Box component="del" fontWeight={600} color="grey.600">
          {currency(price)}
        </Box>
      ) : null}
    </FlexBox>
  );
};

export default ProductPrice;
