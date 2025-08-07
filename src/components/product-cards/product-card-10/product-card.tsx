"use client";

import Box from "@mui/material/Box";
import Link from "next/link";
import { FC, useContext } from "react";
// MUI ICON COMPONENTS
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
import { H4, Paragraph } from "components/Typography";
import { useUnAuthenticatedModal } from "components/modals/unauthenticated-action-modal";
// STYLED COMPONENTS
import { Card, CardMedia, FavoriteButton } from "./styles";
// CUSTOM UTILS LIBRARY FUNCTION
import { calculateDiscountPercentage, currency } from "lib";
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

// ==============================================================
type Props = { product: Product1 };
// ==============================================================

const ProductCard20: FC<Props> = ({ product }: Props) => {
  const {
    id,
    basePrice,
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
  const { requestQuota, isCreatingQuotation } = useQuotation(id, user?.id);

  const minPriceVariant =
    variants?.length > 0 &&
    variants.reduce((minVariant, currentVariant) => {
      return currentVariant.units > 0 && currentVariant.price < minVariant.price
        ? currentVariant
        : minVariant;
    });

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

  const getPrice = () => {
    if (!basePrice) return "";

    const prices = basePrice?.split("-");
    if (prices.length == 1) {
      return currency(prices[0]);
    }
    return `${currency(prices[0])} - ${currency(prices[1], 2, "")}`;
  };

  //
  return (
    <Card
      sx={{
        minWidth: { xs: 100, sm: 360, md: 280, lg: 292 },
        maxWidth: { xs: 190, sm: 200, md: 400 },
      }}
    >
      <CardMedia>
        <DiscountChip
          discount={calculateDiscountPercentage(
            discountType,
            minPriceVariant.price,
            discountAmount
          )}
        />
        {/* PRODUCT IMAGE / THUMBNAIL */}
        <Link href={`/products/${id}_${name}`}>
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

      <Box p={2} textAlign="center">
        {/* PRODUCT TITLE */}
        <Paragraph
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {name}
        </Paragraph>

        {/* PRODUCT PRICE */}

        <H4
          fontWeight={700}
          py={0.5}
          color={isQuotationProduct ? "transparent" : "#000000"}
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {/* {currency(basePrice)} */}
          {getPrice()}
        </H4>

        {/* PRODUCT RATINGS */}
        {/* <FlexRowCenter gap={1} mb={2}>
          <Rating
            name="read-only"
            value={rating || 4}
            readOnly
            sx={{ fontSize: 14 }}
          />
          <Small fontWeight={600} color="grey.500">
            ({reviews.length})
          </Small>
        </FlexRowCenter> */}

        {/* PRODUCT ADD TO CART BUTTON */}
        <LoadingButton
          fullWidth
          color="dark"
          variant="outlined"
          onClick={() =>
            isQuotationProduct
              ? requestQuota()
              : handleAddToCart(product, minPriceVariant, 1)
          }
          loading={isButtonLoading}
          disabled={isOutOfStock || cartUnits >= minPriceVariant.units}
        >
          {isOutOfStock
            ? "Out of stock"
            : isQuotationProduct
              ? "Get Quote"
              : "Add To Cart"}
        </LoadingButton>
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
