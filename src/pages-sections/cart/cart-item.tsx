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
import { currency } from "lib";
// STYLED COMPONENT
import useCartService from "hooks/useCartService";
import { CartItem } from "models/User.model";
import { Wrapper } from "./styles";
import { ENVIRONMENT } from "config";

const CartItem: FC<CartItem> = (props) => {
  const { id, name, units, price, images } = props.product;

  const { handleRemoveFromCart, handleUpdateQty, isLoading } = useCartService();

  return (
    <Wrapper>
      <Image
        alt={name}
        width={140}
        height={140}
        display="block"
        src={
          images[0] ||
          `${ENVIRONMENT.APP_URL}/assets/images/default-product.jpg`
        }
      />

      {/* DELETE BUTTON */}
      <IconButton
        size="small"
        onClick={() => handleRemoveFromCart(props?.product)}
        sx={{ position: "absolute", right: 15, top: 15 }}
        disabled={isLoading}
      >
        <Close fontSize="small" />
      </IconButton>

      <FlexBox p={2} rowGap={2} width="100%" flexDirection="column">
        <Link href={`/products/${id}`}>
          <Span ellipsis fontWeight="600" fontSize={18}>
            {name}
          </Span>
        </Link>

        {/* PRODUCT PRICE SECTION */}
        <FlexBox gap={1} flexWrap="wrap" alignItems="center">
          <Span color="grey.600">
            {currency(price)} x {props?.units}
          </Span>

          <Span fontWeight={600} color="primary.main">
            {currency(price * props?.units)}
          </Span>
        </FlexBox>

        {/* PRODUCT QUANTITY INC/DEC BUTTONS */}
        <FlexBox alignItems="center">
          <Button
            color="primary"
            sx={{ p: "5px" }}
            variant="outlined"
            disabled={props?.units <= 1 || isLoading}
            onClick={() => handleUpdateQty(props?.product, -1)}
          >
            <Remove fontSize="small" />
          </Button>

          <Span mx={1} fontWeight={600} fontSize={15}>
            {props?.units}
          </Span>

          <Button
            color="primary"
            sx={{ p: "5px" }}
            variant="outlined"
            onClick={() => handleUpdateQty(props?.product, 1)}
            disabled={props?.units >= units || isLoading}
          >
            <Add fontSize="small" />
          </Button>
        </FlexBox>
      </FlexBox>
    </Wrapper>
  );
};

export default CartItem;
