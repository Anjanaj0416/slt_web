import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";
import { FC } from "react";
// MUI ICON COMPONENTS
import Add from "@mui/icons-material/Add";
import Close from "@mui/icons-material/Close";
import Remove from "@mui/icons-material/Remove";
// GLOBAL CUSTOM COMPONENTS
import Image from "components/BazaarImage";
import { Span } from "components/Typography";
import { FlexBox } from "components/flex-box";
// GLOBAL CUSTOM HOOK
// CUSTOM UTILS LIBRARY FUNCTION
import { calculateDiscountAmount, currency } from "lib";
// STYLED COMPONENT
import { Wrapper } from "./styles";
import { ENVIRONMENT } from "config";
import { CartItem } from "models/User.model";
import useBuyNowItemService from "hooks/useBuyNowItemService";

const CartItemCard: FC<CartItem> = ({
  productId,
  productName,
  units,
  discountAmount,
  discountType,
  images,
  productVariant,
}: CartItem) => {
  const { handleUpdateQty } = useBuyNowItemService();

  const getPrice = () => {
    if (discountAmount) {
      const discount = calculateDiscountAmount(
        discountType,
        productVariant.price,
        discountAmount
      );
      return productVariant.price - discount;
    }
    return productVariant.price;
  };

  const imageUrl = productVariant.image
    ? `${ENVIRONMENT.S3_BUCKET_URL}/${productVariant.image}`
    : images[0]
      ? `${ENVIRONMENT.S3_BUCKET_URL}/${images[0]}`
      : `${ENVIRONMENT.APP_URL}/assets/images/default-product.jpg`;

  return (
    <Wrapper>
      <Image
        alt={productName}
        width={140}
        height={140}
        display="block"
        src={imageUrl}
      />

      <FlexBox p={2} rowGap={2} width="100%" flexDirection="column">
        <Link
          href={`/products/${productId}_${productName?.replace(/\s+/g, "-")}`}
        >
          <Span ellipsis fontWeight="600" fontSize={18}>
            {productName}
          </Span>
        </Link>

        {/* PRODUCT PRICE SECTION */}
        <FlexBox gap={1} flexWrap="wrap" alignItems="center">
          <Span color="grey.600">
            {currency(getPrice())} x {units}
          </Span>

          <Span fontWeight={600} color="primary.main">
            {currency(getPrice() * units)}
          </Span>
        </FlexBox>

        {/* PRODUCT QUANTITY INC/DEC BUTTONS */}
        <FlexBox alignItems="center">
          <Button
            color="primary"
            sx={{ p: "5px" }}
            variant="outlined"
            disabled={units <= 1}
            onClick={() => handleUpdateQty(productVariant, -1)}
          >
            <Remove fontSize="small" />
          </Button>

          <Span mx={1} fontWeight={600} fontSize={15}>
            {units}
          </Span>

          <Button
            color="primary"
            sx={{ p: "5px" }}
            variant="outlined"
            onClick={() => handleUpdateQty(productVariant, 1)}
            disabled={units >= productVariant?.units}
          >
            <Add fontSize="small" />
          </Button>
        </FlexBox>
      </FlexBox>
    </Wrapper>
  );
};

export default CartItemCard;
