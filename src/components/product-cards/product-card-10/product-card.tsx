"use client";

import Box from "@mui/material/Box";
import Link from "next/link";
import { FC, useContext } from "react";
// MUI ICON COMPONENTS
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
import { H4, H5, Paragraph, Span } from "components/Typography";
import { useUnAuthenticatedModal } from "components/modals/unauthenticated-action-modal";
// STYLED COMPONENTS
import { Card, CardMedia, FavoriteButton } from "./styles";
// CUSTOM UTILS LIBRARY FUNCTION
import {
  calculateDiscountAmount,
  calculateDiscountPercentage,
  currency,
} from "lib";
// CUSTOM DATA MODEL
import { LoadingButton } from "@mui/lab";
import { ENVIRONMENT } from "config";
import useCartService from "hooks/useCartService";
import { Product1 } from "models/Product.model";
import { useSession } from "next-auth/react";
import { User1 } from "models/User.model";
import { useUpdateWishlistMutation } from "services/wishlist-api";
import { useSnackbar } from "notistack";
import { WishlistContext } from "contexts/WishlistContext";
import useQuotation from "hooks/useQuotation";
import DiscountChip from "../discount-chip";
import CartButtonIcon from "icons/CartButton";
import { Button, CircularProgress, Rating, Tooltip } from "@mui/material";
import { FlexBetween } from "components/flex-box";
import { StyledChip } from "pages-sections/sales/styles";

// ==============================================================
type Props = { product: Product1 };
// ==============================================================

const ProductCard20: FC<Props> = ({ product }: Props) => {
  const {
    id,
    name,
    images,
    productType,
    variants,
    discountAmount,
    discountType,
  } = product;
  const [updateWishlist, { error }] = useUpdateWishlistMutation();
  const { data } = useSession();
  const user = data?.user as User1;
  const { setIsOpen: openUnAuthenticatedModal } = useUnAuthenticatedModal();
  const { enqueueSnackbar } = useSnackbar();
  const { wishlist, setWishlist } = useContext(WishlistContext);
  const minPriceVariant =
    variants?.length > 0 &&
    variants.reduce((minVariant, currentVariant) => {
      return currentVariant.units > 0 && currentVariant.price < minVariant.price
        ? currentVariant
        : minVariant;
    });
  const { requestQuota, isCreatingQuotation } = useQuotation(
    minPriceVariant.id,
    user?.id
  );

  // Map wishlist products to product ids
  const wishListProductIds = wishlist?.products?.map((product) => product.id);
  //
  const { handleAddToCart, isItemInCart, selectedProductId, isLoading } =
    useCartService();
  //
  const isQuotationProduct = productType === "QUOTATION";
  //
  const isOutOfStock = !isQuotationProduct && minPriceVariant.units <= 0;
  //
  const cartUnits = isItemInCart(minPriceVariant)?.units;
  //
  const isButtonLoading =
    (selectedProductId === minPriceVariant.id && isLoading) ||
    isCreatingQuotation;

  const imgUrl = images?.[0]
    ? `${ENVIRONMENT.S3_BUCKET_URL}/${images[0]}`
    : `${ENVIRONMENT.APP_URL}/assets/images/default-product.jpg`;

  const toggleFavorite = async () => {
    if (user?.id) {
      const oldWishlistProducts = [...(wishlist?.products ?? [])];
      //
      let newWishListProducts;
      if (wishListProductIds.includes(id)) {
        newWishListProducts = wishlist?.products.filter(
          (product) => product.id != id
        );
      } else {
        if (wishlist?.products.length >= Number(ENVIRONMENT.WISHLIST_LIMIT)) {
          enqueueSnackbar(
            `Wishlist max limit exceeded! Max product limit is ${ENVIRONMENT.WISHLIST_LIMIT}`,
            {
              variant: "error",
            }
          );
          return;
        }
        newWishListProducts = [...wishlist?.products, product];
      }
      //
      setWishlist((prvState) => ({
        ...prvState,
        products: newWishListProducts,
      }));
      //
      const productIds = newWishListProducts.map((product) => product.id);
      //
      await updateWishlist({
        userId: user.id,
        wishlistId: user.wishlist.id,
        body: { productIds },
      });
      //
      if (error) {
        setWishlist((prvState) => ({
          ...prvState,
          products: oldWishlistProducts,
        }));
        enqueueSnackbar("Something went to wrong", {
          variant: "error",
        });
      }
    } else {
      openUnAuthenticatedModal(true);
    }
  };

  const getDiscountedPrice = () => {
    if (discountAmount) {
      const discount = calculateDiscountAmount(
        discountType,
        minPriceVariant.price,
        discountAmount
      );
      return minPriceVariant.price - discount;
    }
    return minPriceVariant.price;
  };
  const encodedId = encodeURIComponent(`${id}_${name}`);
  //
  return (
    <Card
      sx={{
        borderRadius: 3,
        border: "2px solid #DADADA",
      }}
    >
      <CardMedia
        sx={{
          borderRadius: 3,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }}
      >
        <DiscountChip
          sx={{ fontSize: { xs: 8, md: 10 } }}
          discount={calculateDiscountPercentage(
            discountType,
            minPriceVariant.price,
            discountAmount
          )}
        />

        {isOutOfStock && (
          <>
            <StyledChip
              size="small"
              label="Out of Stock"
              selected={0}
              sx={{
                top: discountAmount ? 42 : 12,
                right: "47%",
                left: 8,
                maxWidth: "86px",
                fontSize: { xs: 8, md: 10 },
                padding: 0,
                "@media (max-width:400px)": {
                  right: "40%",
                  maxWidth: "80px",
                },
              }}
            />
          </>
        )}
        {/* PRODUCT IMAGE / THUMBNAIL */}
        <Link href={`/products/${encodedId}`}>
          <LazyImage
            width={300}
            height={300}
            alt={name}
            src={imgUrl}
            className="product-img"
          />
        </Link>

        {/* PRODUCT VIEW BUTTON */}
        {/* <StyledIconButton className="product-actions" onClick={toggleDialog}>
          <RemoveRedEye color="disabled" fontSize="small" />
        </StyledIconButton> */}

        {/* PRODUCT FAVORITE BUTTON */}
        <FavoriteButton className="product-actions" onClick={toggleFavorite}>
          {wishListProductIds?.includes(product.id) ? (
            <Favorite color="primary" fontSize="small" />
          ) : (
            <FavoriteBorder color="disabled" fontSize="small" />
          )}
        </FavoriteButton>
      </CardMedia>

      {/* PRODUCT VIEW BOX */}
      {/* <ProductViewDialog2
        openDialog={openModal}
        handleCloseDialog={toggleDialog}
        product={product}
      /> */}

      <Box p={2}>
        {/* PRODUCT TITLE */}
        <Paragraph
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            textTransform: "capitalize",
            "@media (max-width:400px)": {
              fontSize: 10,
            },
          }}
        >
          {name}
        </Paragraph>

        <Rating color="warn" value={4} readOnly size="small" />

        {/* PRODUCT ADD TO CART BUTTON */}
        {isQuotationProduct && (
          <LoadingButton
            fullWidth
            color="dark"
            variant="outlined"
            onClick={requestQuota}
            loading={isButtonLoading}
            disabled={isOutOfStock || cartUnits >= minPriceVariant.units}
          >
            {isOutOfStock ? "Out of stock" : "Get Quote"}
          </LoadingButton>
        )}
        {!isQuotationProduct && (
          <FlexBetween alignItems={"center"}>
            <Box
              fontWeight={700}
              py={0.5}
              color={isQuotationProduct ? "transparent" : "#000000"}
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                pt: isOutOfStock ? 1 : 0,
                fontSize: { xs: 14, md: 14, lg: 16 },
                "@media (max-width:400px)": {
                  fontSize: 10,
                },
              }}
            >
              {/* {currency(basePrice)} */}
              {minPriceVariant.price === getDiscountedPrice() ? (
                currency(minPriceVariant.price)
              ) : (
                <Box>
                  {"LKR "}
                  {`${currency(getDiscountedPrice(), 0, "")} `}
                  <Span
                    color={"gray"}
                    sx={{
                      textDecoration: "line-through",
                      ml: 0.5,
                      fontWeight: 400,
                      fontSize: 14,
                      display: { xs: "none", lg: "inline-block" },
                    }}
                  >
                    {currency(minPriceVariant.price, 0, "")}
                  </Span>
                </Box>
              )}
            </Box>

            <Tooltip title={"Add to cart"}>
              <Button
                sx={{
                  borderRadius: 3,
                  px: {
                    xs: 0.8,
                    md: 1.2,
                    lg: 2,
                    "@media (max-width:400px)": {
                      display: "none",
                    },
                  },
                  border: "1px solid #DADADA",
                }}
                onClick={() => handleAddToCart(product, minPriceVariant, 1)}
                disabled={
                  isOutOfStock ||
                  cartUnits >= minPriceVariant.units ||
                  isButtonLoading
                }
              >
                {isButtonLoading ? (
                  <CircularProgress size={22} color="secondary" />
                ) : (
                  <CartButtonIcon />
                )}
              </Button>
            </Tooltip>
          </FlexBetween>
        )}
      </Box>
    </Card>
    // <Card>
    //   <CardMedia>
    //     {/* PRODUCT IMAGE / THUMBNAIL */}
    //     <Link href={`/products/${slug}`}>
    //       <LazyImage
    //         width={300}
    //         height={300}
    //         alt="category"
    //         src={thumbnail}
    //         className="product-img"
    //       />
    //     </Link>

    //     {/* PRODUCT VIEW BUTTON */}
    //     <StyledIconButton className="product-actions" onClick={toggleDialog}>
    //       <RemoveRedEye color="disabled" fontSize="small" />
    //     </StyledIconButton>

    //     {/* PRODUCT FAVORITE BUTTON */}
    //     <FavoriteButton className="product-actions" onClick={toggleFavorite}>
    //       {isFavorite ? (
    //         <Favorite color="primary" fontSize="small" />
    //       ) : (
    //         <FavoriteBorder color="disabled" fontSize="small" />
    //       )}
    //     </FavoriteButton>
    //   </CardMedia>

    //   {/* PRODUCT VIEW BOX */}
    //   <ProductViewDialog
    //     openDialog={openModal}
    //     handleCloseDialog={toggleDialog}
    //     product={{ id, slug, title, price, imgGroup: [thumbnail, thumbnail] }}
    //   />

    //   <Box p={2} textAlign="center">
    //     {/* PRODUCT TITLE */}
    //     <Paragraph>{title}</Paragraph>

    //     {/* PRODUCT PRICE */}
    //     <H4 fontWeight={700} py={0.5}>
    //       {currency(price)}
    //     </H4>

    //     {/* PRODUCT RATINGS */}
    //     <FlexRowCenter gap={1} mb={2}>
    //       <Rating
    //         name="read-only"
    //         value={rating || 4}
    //         readOnly
    //         sx={{ fontSize: 14 }}
    //       />
    //       <Small fontWeight={600} color="grey.500">
    //         ({reviews.length})
    //       </Small>
    //     </FlexRowCenter>

    //     {/* PRODUCT ADD TO CART BUTTON */}
    //     <Button
    //       fullWidth
    //       color="dark"
    //       variant="outlined"
    //       onClick={handleAddToCart}
    //     >
    //       Add To Cart
    //     </Button>
    //   </Box>
    // </Card>
  );
};

export default ProductCard20;
