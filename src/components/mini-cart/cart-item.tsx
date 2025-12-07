import { FC } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
// MUI ICON COMPONENTS
import Add from "@mui/icons-material/Add";
import Close from "@mui/icons-material/Close";
import Remove from "@mui/icons-material/Remove";
// GLOBAL CUSTOM COMPONENTS
import { FlexBox } from "components/flex-box";
import { H6, Tiny } from "components/Typography";
// CUSTOM UTILS LIBRARY FUNCTION
import {
  calculateDiscountAmount,
  calculateDiscountPercentage,
  calculateDiscountPrice,
  currency,
} from "lib";
import { CartItem } from "models/User.model";
import useCartService from "hooks/useCartService";
import { ENVIRONMENT } from "config";
// CUSTOM DATA MODEL

// ==============================================================
interface Props {
  item: CartItem;
}
// ==============================================================

const MiniCartItem: FC<Props> = ({ item }) => {
  const {
    productVariant,
    productName,
    productId,
    images,
    units,
    discountAmount,
    discountType,
  } = item;
  const { handleUpdateQty, handleRemoveFromCart, isLoading } = useCartService();

  const attributeNames: string[] = productVariant.attributes.map(
    (attr) => attr.value
  );

  const getPrice = () => {
    const discount = calculateDiscountAmount(
      discountType,
      productVariant.price,
      discountAmount
    );
    if (discountAmount) {
      return productVariant.price - discount;
    }
    return productVariant.price;
  };
  const imageUrl = productVariant.image
    ? `${ENVIRONMENT.S3_BUCKET_URL}/${productVariant.image}`
    : images[0]
      ? `${ENVIRONMENT.S3_BUCKET_URL}/${images[0]}`
      : `${ENVIRONMENT.APP_URL}/assets/images/default-product.jpg`;
  //
  return (
    <FlexBox
      py={2}
      px={2.5}
      key={productId}
      alignItems="center"
      borderBottom="1px solid"
      borderColor="divider"
    >
      <FlexBox alignItems="center" flexDirection="column">
        <Button
          size="small"
          color="primary"
          variant="outlined"
          sx={{ height: 28, width: 28, borderRadius: 50 }}
          onClick={() => handleUpdateQty(productVariant, 1)}
          disabled={units >= productVariant?.units || isLoading}
        >
          <Add fontSize="small" />
        </Button>

        <H6 my="3px">{units}</H6>

        <Button
          size="small"
          color="primary"
          variant="outlined"
          disabled={units <= 1 || isLoading}
          onClick={() => handleUpdateQty(productVariant, -1)}
          sx={{ height: 28, width: 28, borderRadius: 50 }}
        >
          <Remove fontSize="small" />
        </Button>
      </FlexBox>

      <Link
        href={`/products/${productId}_${productName?.replace(/\s+/g, "-")}`}
      >
        <Avatar
          alt={productName}
          src={imageUrl}
          sx={{ mx: 1, width: 75, height: 75 }}
        />
      </Link>

      <Box
        flex="1"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
        overflow="hidden"
      >
        <Link href={`/products/${productId}_${productName?.replace(/\s+/g, "-")}`}>
          <H6 ellipsis className="title">
            {productName}
          </H6>
        </Link>

        <div>
          {attributeNames.map((attrName, index) => (
            <Box
              key={index}
              fontSize={10}
              bgcolor="#FCE9EC"
              color="primary.main"
              borderRadius={4}
              display="inline-block"
              minWidth={25}
              paddingX={0.4}
              paddingY={0.2}
              mr={1}
              textAlign={"center"}
            >
              {attrName}
            </Box>
          ))}
        </div>
        <Tiny color="grey.600">
          {currency(+getPrice())} x {units}
        </Tiny>

        <H6 color="primary.main" mt={0.5}>
          {currency(units * +getPrice())}
        </H6>
      </Box>

      <IconButton
        size="small"
        sx={{ marginLeft: 2.5 }}
        onClick={() => handleRemoveFromCart(productVariant)}
        disabled={isLoading}
      >
        <Close fontSize="small" />
      </IconButton>
    </FlexBox>
  );
};

export default MiniCartItem;
