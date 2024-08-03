import { FC } from "react";
import Box from "@mui/material/Box";
// GLOBAL CUSTOM COMPONENTS
import { FlexBox } from "components/flex-box";
import { Paragraph } from "components/Typography";
// CUSTOM UTILS LIBRARY FUNCTIONS
import { calculateDiscountPrice, currency } from "lib";

// ==============================================================
type Props = { price: number; off: number };
// ==============================================================

const ProductPrice: FC<Props> = ({ price, off }) => (
  <FlexBox gap={1} alignItems="center">
    <Paragraph fontWeight="600" color="primary.main">
      {calculateDiscountPrice(price, off)}
    </Paragraph>

    {off ? (
      <Box component="del" fontWeight="600" color="grey.600">
        {currency(price)}
      </Box>
    ) : null}
  </FlexBox>
);

export default ProductPrice;
