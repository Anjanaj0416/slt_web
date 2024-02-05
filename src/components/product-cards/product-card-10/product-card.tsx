"use client";

import Box from "@mui/material/Box";
import Link from "next/link";
import { FC, useState } from "react";
// MUI ICON COMPONENTS
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye";
// LOCAL CUSTOM HOOK
import useProduct from "../use-product";
// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
import { H4, Paragraph } from "components/Typography";
import ProductViewDialog from "components/products-view/product-view-dialog";
// STYLED COMPONENTS
import { Card, CardMedia, FavoriteButton, StyledIconButton } from "./styles";
// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";
// CUSTOM DATA MODEL
import { LoadingButton } from "@mui/lab";
import { ENVIRONMENT } from "config";
import useCartService from "hooks/useCartService";
import { Product1 } from "models/Product.model";

// ==============================================================
type Props = { product: Product1 };
// ==============================================================

const ProductCard20: FC<Props> = ({ product }) => {
  const { id, price, name, images } = product;
  //
  const { handleAddToCart, isItemInCart, selectedProductId, isLoading } =
    useCartService();
  //
  const { isFavorite, openModal, toggleDialog, toggleFavorite } =
    useProduct(id);
  //
  const isOutOfStock = product.units <= 0;
  //
  const cartUnits = isItemInCart(product)?.units;
  //
  return (
    <Card>
      <CardMedia>
        {/* PRODUCT IMAGE / THUMBNAIL */}
        <Link href={`/products/${id}`}>
          <LazyImage
            width={300}
            height={300}
            alt={name}
            src={
              images[0] ||
              `${ENVIRONMENT.APP_URL}/assets/images/default-product.jpg`
            }
            className="product-img"
          />
        </Link>

        {/* PRODUCT VIEW BUTTON */}
        <StyledIconButton className="product-actions" onClick={toggleDialog}>
          <RemoveRedEye color="disabled" fontSize="small" />
        </StyledIconButton>

        {/* PRODUCT FAVORITE BUTTON */}
        <FavoriteButton className="product-actions" onClick={toggleFavorite}>
          {isFavorite ? (
            <Favorite color="primary" fontSize="small" />
          ) : (
            <FavoriteBorder color="disabled" fontSize="small" />
          )}
        </FavoriteButton>
      </CardMedia>

      {/* PRODUCT VIEW BOX */}
      <ProductViewDialog
        openDialog={openModal}
        handleCloseDialog={toggleDialog}
        product={{
          id,
          slug: id,
          name,
          price,
          imgGroup: [`${ENVIRONMENT.S3_BUCKET_URL}/${images[0]}`],
        }}
      />

      <Box p={2} textAlign="center">
        {/* PRODUCT TITLE */}
        <Paragraph>{name}</Paragraph>

        {/* PRODUCT PRICE */}
        <H4 fontWeight={700} py={0.5}>
          {currency(price)}
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
          onClick={() => handleAddToCart(product, 1)}
          loading={selectedProductId === product.id && isLoading}
          disabled={isOutOfStock || cartUnits >= product.units}
        >
          {isOutOfStock ? "Out of stock" : "Add To Cart"}
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
