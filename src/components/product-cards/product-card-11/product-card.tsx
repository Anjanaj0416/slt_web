"use client";

import { FC } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
import { Paragraph, Span } from "components/Typography";
// LOCAL CUSTOM HOOK
import useProduct from "../use-product";
// LOCAL CUSTOM COMPONENTS
import HoverActions from "./hover-actions";
import ProductTitle from "../product-title";
import DiscountChip from "../discount-chip";
import QuantityButtons from "./quantity-buttons";
// STYLED COMPONENTS
import { ImageWrapper, ContentWrapper, StyledBazaarCard } from "./styles";
import useCartService from "hooks/useCartService";
import { Product1 } from "models/Product.model";
import ENVIRONMENT from "config/environment";
import { calculateDiscountPercentage, currency } from "lib";
import ProductViewDialog2 from "components/products-view/product-view-dialog2";

// ========================================================
type Props = {
  product: Product1;
  rating?: number;
  isUpdating: boolean;
  hideRating?: boolean;
  hoverEffect?: boolean;
  showProductSize?: boolean;
  handleFavorite: (id: string) => void;
  isFavorite?: boolean;
};
// ========================================================

const ProductCard11: FC<Props> = ({
  product,
  rating = 5,
  hideRating,
  hoverEffect,
  handleFavorite,
  showProductSize,
  isUpdating,
  isFavorite = true,
}) => {
  const {
    id,
    name,
    basePrice,
    discountAmount,
    images,
    discountType,
    variants,
  } = product;
  const { openModal, toggleDialog } = useProduct(id);
  const minPriceVariant =
    variants.length > 0 &&
    variants.reduce((minVariant, currentVariant) => {
      return currentVariant.units > 0 && currentVariant.price < minVariant.price
        ? currentVariant
        : minVariant;
    });

  const { handleAddToCart, isItemInCart, handleRemoveFromCart } =
    useCartService();
  const cartUnits = isItemInCart(minPriceVariant)?.units;

  const handleIncrementQuantity = () => {
    handleAddToCart(product, minPriceVariant, 1);
  };
  const handleDecrementQuantity = () => {
    if (cartUnits === 1) {
      handleRemoveFromCart(minPriceVariant);
      return;
    }
    handleAddToCart(product, minPriceVariant, -1);
  };
  const imgUrl = images[0]
    ? `${ENVIRONMENT.S3_BUCKET_URL}/${images[0]}`
    : `${ENVIRONMENT.APP_URL}/assets/images/default-product.jpg`;
  return (
    <StyledBazaarCard hoverEffect={hoverEffect}>
      <ImageWrapper>
        {/* DISCOUNT PERCENT CHIP IF AVAILABLE */}
        <DiscountChip
          discount={calculateDiscountPercentage(
            discountType,
            minPriceVariant.price,
            discountAmount
          )}
        />

        {/* HOVER ACTION ICONS */}
        <HoverActions
          isFavorite={isFavorite}
          disabledFavButton={isUpdating}
          toggleView={toggleDialog}
          toggleFavorite={() => handleFavorite(id)}
        />

        {/* PRODUCT IMAGE / THUMBNAIL */}
        <Link href={`/products/${id}_${name}`}>
          <LazyImage
            priority
            src={imgUrl}
            width={500}
            height={500}
            alt={name}
          />
        </Link>
      </ImageWrapper>

      {/* PRODUCT VIEW DIALOG BOX */}
      {/* <ProductViewDialog2
        openDialog={openModal}
        handleCloseDialog={toggleDialog}
        product={product}
      /> */}

      <ContentWrapper>
        <Box flex="1 1 0" minWidth="0px" mr={1}>
          {/* PRODUCT NAME / TITLE */}
          <ProductTitle title={name} id={id} />

          {/* PRODUCT RATINGS IF AVAILABLE */}
          {!hideRating ? (
            <Rating size="small" value={rating} color="warn" readOnly />
          ) : null}

          {/* PRODUCT SIZE IF AVAILABLE */}
          {showProductSize ? (
            <Span color="grey.600" mb={1} display="block">
              Liter
            </Span>
          ) : null}

          {/* PRODUCT PRICE WITH DISCOUNT */}
          {/* <ProductPrice
            discount={calculateDiscountPercentage(
              discountType,
              minPriceVariant.price,
              discountAmount
            )}
            price={basePrice}
          /> */}
          <Paragraph fontWeight={600} color="primary.main">
            {currency(basePrice)}
          </Paragraph>
        </Box>

        {/* PRODUCT QUANTITY HANDLER BUTTONS */}
        <QuantityButtons
          quantity={cartUnits || 0}
          handleIncrement={handleIncrementQuantity}
          handleDecrement={handleDecrementQuantity}
        />
      </ContentWrapper>
    </StyledBazaarCard>
  );
};

export default ProductCard11;
