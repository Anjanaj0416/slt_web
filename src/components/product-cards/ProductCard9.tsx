import { FC } from "react";
import Link from "next/link";
import { Add, Remove, FavoriteBorder } from "@mui/icons-material";
import { Box, Button, Card, Chip, Grid, IconButton, Rating, styled } from "@mui/material";
import Image from "components/BazaarImage";
import { H5 } from "components/Typography";
import { FlexBetween, FlexBox } from "components/flex-box";

import { calculateDiscount, currency } from "lib";
import useCart from "hooks/useCart";

// styled components
const Wrapper = styled(Card)({
  width: "100%",
  overflow: "hidden",
  position: "relative",
  marginBottom: "1.25rem",
});

// ===========================================================
type Props = {
  id: string;
  off?: number;
  slug: string;
  price: number;
  title: string;
  imgUrl: string;
  rating: number;
};
// ===========================================================

const ProductCard9: FC<Props> = (props) => {
  const { imgUrl, title, price, off, rating, id, slug } = props;

  const { state, dispatch } = useCart();
  const cartItem = state.cart.find((item) => item.slug === slug);

  const handleCartAmountChange = (amount: number) => () => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: { name: title, qty: amount, price, imgUrl, id, slug },
    });
  };

  return (
    <Wrapper>
      <IconButton size="small" sx={{ position: "absolute", top: 15, right: 15 }}>
        <FavoriteBorder fontSize="small" />
      </IconButton>

      <Grid container spacing={1}>
        <Grid item sm={3} xs={12}>
          <Box position="relative">
            {off ? (
              <Chip
                size="small"
                color="primary"
                label={`${off}% off`}
                sx={{
                  top: 15,
                  left: 15,
                  px: "5px",
                  fontSize: 10,
                  fontWeight: 600,
                  position: "absolute",
                }}
              />
            ) : null}

            <Image src={imgUrl} alt={title} width="100%" />
          </Box>
        </Grid>

        <Grid item sm={9} xs={12}>
          <FlexBox flexDirection="column" justifyContent="center" height="100%" p={2}>
            <Link href={`/products/${slug}`}>
              <H5 fontWeight="600" my="0.5rem">
                {title}
              </H5>
            </Link>

            <Rating value={rating || 0} color="warn" readOnly />

            <FlexBox gap={1} mt={1} mb={2} alignItems="center">
              <H5 fontWeight={600} color="primary.main">
                {currency(price)}
              </H5>

              {off ? (
                <Box component="del" fontWeight="600" color="grey.600">
                  {calculateDiscount(price, off)}
                </Box>
              ) : null}
            </FlexBox>

            <FlexBox>
              {!cartItem?.qty && (
                <Button
                  color="primary"
                  variant="contained"
                  sx={{ height: 32 }}
                  onClick={handleCartAmountChange(1)}
                >
                  Add To Cart
                </Button>
              )}

              {cartItem?.qty ? (
                <FlexBetween>
                  <Button
                    color="primary"
                    variant="outlined"
                    sx={{ padding: "5px" }}
                    onClick={handleCartAmountChange(cartItem.qty + 1)}
                  >
                    <Add fontSize="small" />
                  </Button>

                  <H5 fontWeight="600" fontSize="15px" mx={1.5}>
                    {cartItem.qty}
                  </H5>

                  <Button
                    color="primary"
                    variant="outlined"
                    sx={{ padding: "5px" }}
                    onClick={handleCartAmountChange(cartItem.qty - 1)}
                  >
                    <Remove fontSize="small" />
                  </Button>
                </FlexBetween>
              ) : null}
            </FlexBox>
          </FlexBox>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default ProductCard9;
