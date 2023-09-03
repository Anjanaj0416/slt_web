import { FC } from "react";
import Link from "next/link";
import { Avatar, Box, Button, IconButton } from "@mui/material";
import Add from "@mui/icons-material/Add";
import Close from "@mui/icons-material/Close";
import Remove from "@mui/icons-material/Remove";
// GLOBAL CUSTOM COMPONENTS
import { FlexBox } from "components/flex-box";
import { H5, Tiny } from "components/Typography";
// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";
// CUSTOM DATA MODEL
import { CartItem } from "contexts/CartContext";

// ==============================================================
interface Props {
  item: CartItem;
  handleCartAmountChange: (amount: number, product: CartItem) => () => void;
}
// ==============================================================

const MiniCartItem: FC<Props> = ({ item, handleCartAmountChange }) => {
  return (
    <FlexBox
      py={2}
      px={2.5}
      key={item.id}
      alignItems="center"
      borderBottom="1px solid"
      borderColor="divider"
    >
      <FlexBox alignItems="center" flexDirection="column">
        <Button
          color="primary"
          variant="outlined"
          onClick={handleCartAmountChange(item.qty + 1, item)}
          sx={{ height: "32px", width: "32px", borderRadius: "300px" }}
        >
          <Add fontSize="small" />
        </Button>

        <Box fontWeight={600} fontSize="15px" my="3px">
          {item.qty}
        </Box>

        <Button
          color="primary"
          variant="outlined"
          disabled={item.qty === 1}
          onClick={handleCartAmountChange(item.qty - 1, item)}
          sx={{ height: "32px", width: "32px", borderRadius: "300px" }}
        >
          <Remove fontSize="small" />
        </Button>
      </FlexBox>

      <Link href={`/products/${item.id}`}>
        <Avatar alt={item.name} src={item.imgUrl} sx={{ mx: 2, width: 76, height: 76 }} />
      </Link>

      <Box flex="1" sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        <Link href={`/products/${item.slug}`}>
          <H5 ellipsis fontSize="14px" className="title">
            {item.name}
          </H5>
        </Link>

        <Tiny color="grey.600">
          {currency(item.price)} x {item.qty}
        </Tiny>

        <Box fontWeight={600} fontSize="14px" color="primary.main" mt={0.5}>
          {currency(item.qty * item.price)}
        </Box>
      </Box>

      <IconButton size="small" onClick={handleCartAmountChange(0, item)} sx={{ marginLeft: 2.5 }}>
        <Close fontSize="small" />
      </IconButton>
    </FlexBox>
  );
};

export default MiniCartItem;
