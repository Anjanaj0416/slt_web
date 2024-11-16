import { FC } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import styled from "@mui/material/styles/styled";
// GLOBAL CUSTOM COMPONENTS
import Image from "components/BazaarImage";
import { H5, Paragraph } from "components/Typography";
import { FlexBox } from "components/flex-box";
// LOCAL CUSTOM HOOK
import useProduct from "../use-product";
// LOCAL CUSTOM COMPONENTS
import DiscountChip from "../discount-chip";
import ProductPrice from "../product-price";
import AddToCartButton from "./add-to-cart";
import FavoriteButton from "./favorite-button";
import useCartService from "hooks/useCartService";
import { Product1 } from "models/Product.model";
import {
  calculateDiscountAmount,
  calculateDiscountPercentage,
  currency,
} from "lib";
import ENVIRONMENT from "config/environment";
import useQuotation from "hooks/useQuotation";
import { User1 } from "models/User.model";
import { useSession } from "next-auth/react";
import { LoadingButton } from "@mui/lab";

// STYLED COMPONENT
const Wrapper = styled(Card)({
  width: "100%",
  overflow: "hidden",
  position: "relative",
  marginBottom: "1.25rem",
});

// ===========================================================
type Props = {
  product: Product1;
};
// ===========================================================

const ProductListCard: FC<Props> = ({ product }: Props) => {
  const {
    id,
    name,
    basePrice,
    discountAmount,
    discountType,
    images,
    productType,
    variants,
  } = product;
  console.log(basePrice);

  const minPriceVariant =
    variants.length > 0 &&
    variants.reduce((minVariant, currentVariant) => {
      return currentVariant.units > 0 && currentVariant.price < minVariant.price
        ? currentVariant
        : minVariant;
    });
  console.log(minPriceVariant);
  const { isFavorite, toggleFavorite } = useProduct(id);
  const {
    handleAddToCart,
    handleRemoveFromCart,
    cart,
    selectedProductId,
    isUpdating,
  } = useCartService();
  //
  const { data } = useSession();
  const user = data?.user as User1;
  //
  const { requestQuota, isCreatingQuotation } = useQuotation(
    id,
    user?.email,
    user?.id
  );
  //
  const isQuotationProduct = productType === "QUOTATION";

  const handleCartAmountChange = (quantity: number) => {
    if (
      quantity === -1 &&
      cart.cartItems.find((e) => e.productVariant.id === minPriceVariant.id)
        .units === 1
    ) {
      handleRemoveFromCart(minPriceVariant);
    } else {
      handleAddToCart(product, minPriceVariant, quantity);
    }
  };
  // const discountPercent = calculateDiscountAmount(
  //   discountType,
  //   minPriceVariant.price,
  //   discountAmount
  // );

  const handleCart = () => handleAddToCart(product, minPriceVariant, 1);

  return (
    <Wrapper>
      {/* PRODUCT FAVORITE BUTTON */}
      <FavoriteButton isFavorite={isFavorite} toggleFavorite={toggleFavorite} />

      <Grid container spacing={1}>
        <Grid item sm={3} xs={12} alignContent="center">
          <Box position="relative" height="100%">
            {/* DISCOUNT PERCENT CHIP IF AVAILABLE */}
            {!isQuotationProduct && (
              <DiscountChip
                discount={calculateDiscountPercentage(
                  discountType,
                  minPriceVariant.price,
                  discountAmount
                )}
              />
            )}

            {/* PRODUCT IMAGE / THUMBNAIL */}
            <Image
              src={
                images?.[0]
                  ? `${ENVIRONMENT.S3_BUCKET_URL}/${images[0]}`
                  : `${ENVIRONMENT.APP_URL}/assets/images/default-product.jpg`
              }
              alt={name}
              height="100%"
              maxWidth="120px"
            />
          </Box>
        </Grid>

        <Grid item sm={9} xs={12}>
          <FlexBox
            flexDirection="column"
            justifyContent="center"
            height="100%"
            p={2}
          >
            {/* PRODUCT TITLE / NAME */}
            <Link href={`/products/${id}`}>
              <H5 fontWeight="600" my="0.5rem">
                {name}
              </H5>
            </Link>

            {/* PRODUCT RATING / REVIEW  */}
            {/* <Rating size="small" value={rating} color="warn" readOnly /> */}

            {/* PRODUCT PRICE */}
            {!isQuotationProduct && (
              <Paragraph fontWeight={600} color="primary.main">
                {currency(basePrice)}
              </Paragraph>
            )}

            {/* PRODUCT ADD TO CART BUTTON */}
            {isQuotationProduct ? (
              <FlexBox mt={1}>
                <LoadingButton
                  color="primary"
                  variant="contained"
                  sx={{ height: 32 }}
                  loading={isCreatingQuotation}
                  onClick={requestQuota}
                >
                  Get Quote
                </LoadingButton>
              </FlexBox>
            ) : (
              <AddToCartButton
                disabled={isUpdating && selectedProductId === id}
                quantity={
                  cart.cartItems.find(
                    (e) => e.productVariant.id === minPriceVariant.id
                  )?.units
                }
                handleAddToCart={handleCart}
                handleAmountChange={handleCartAmountChange}
              />
            )}
          </FlexBox>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default ProductListCard;
