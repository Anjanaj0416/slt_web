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
import { currency } from "lib";
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
  const { product, units } = item;
  const { handleUpdateQty, handleRemoveFromCart, isLoading } = useCartService();
  //
  return (
    <FlexBox
      py={2}
      px={2.5}
      key={product?.id}
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
          onClick={() => handleUpdateQty(product, 1)}
          disabled={units >= product?.units || isLoading}
        >
          <Add fontSize="small" />
        </Button>

        <H6 my="3px">{units}</H6>

        <Button
          size="small"
          color="primary"
          variant="outlined"
          disabled={units <= 1 || isLoading}
          onClick={() => handleUpdateQty(product, -1)}
          sx={{ height: 28, width: 28, borderRadius: 50 }}
        >
          <Remove fontSize="small" />
        </Button>
      </FlexBox>

      <Link href={`/products/${product?.id}`}>
        <Avatar
          alt={product?.name}
          src={
            `${ENVIRONMENT.S3_BUCKET_URL}/${product.images[0]}` ||
            `${ENVIRONMENT.APP_URL}/assets/images/default-product.jpg`
          }
          sx={{ mx: 1, width: 75, height: 75 }}
        />
      </Link>

      <Box
        flex="1"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
        overflow="hidden"
      >
        <Link href={`/products/${product?.id}`}>
          <H6 ellipsis className="title">
            {product?.name}
          </H6>
        </Link>

        <Tiny color="grey.600">
          {currency(product?.price)} x {units}
        </Tiny>

        <H6 color="primary.main" mt={0.5}>
          {currency(units * product?.price)}
        </H6>
      </Box>

      <IconButton
        size="small"
        sx={{ marginLeft: 2.5 }}
        onClick={() => handleRemoveFromCart(product)}
        disabled={isLoading}
      >
        <Close fontSize="small" />
      </IconButton>
    </FlexBox>
  );
};

export default MiniCartItem;
