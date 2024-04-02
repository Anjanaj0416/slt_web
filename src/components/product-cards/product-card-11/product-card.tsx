"use client";

import { FC } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
import { Span } from "components/Typography";
import ProductViewDialog from "components/products-view/product-view-dialog";
// LOCAL CUSTOM HOOK
import useProduct from "../use-product";
// LOCAL CUSTOM COMPONENTS
import HoverActions from "./hover-actions";
import ProductPrice from "../product-price";
import ProductTitle from "../product-title";
import DiscountChip from "../discount-chip";
import QuantityButtons from "./quantity-buttons";
// STYLED COMPONENTS
import { ImageWrapper, ContentWrapper, StyledBazaarCard } from "./styles";
import useCartService from "hooks/useCartService";
import { Product1 } from "models/Product.model";
import ENVIRONMENT from "config/environment";

// ========================================================
type Props = {
  product: Product1;
  rating?: number;
  isUpdating: boolean;
  hideRating?: boolean;
  hoverEffect?: boolean;
  showProductSize?: boolean;
  handleFavorite: (id: string) => void;
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
}) => {
  const { id, name, price, discount, images, discountType } = product;
  const { openModal, toggleDialog } = useProduct(id);

  const { handleAddToCart } = useCartService();

  const handleIncrementQuantity = () => {
    handleAddToCart(product, 1);
  };
  const imgUrl = images[0]
    ? `${ENVIRONMENT.S3_BUCKET_URL}/${images[0]}`
    : `${ENVIRONMENT.APP_URL}/assets/images/default-product.jpg`;
  return (
    <StyledBazaarCard hoverEffect={hoverEffect}>
      <ImageWrapper>
        {/* DISCOUNT PERCENT CHIP IF AVAILABLE */}
        <DiscountChip
          discount={
            !discount || discountType === "NONE"
              ? 0
              : discountType === "PERCENTAGE"
                ? discount
                : ((price - discount) * 100) / price
          }
        />

        {/* HOVER ACTION ICONS */}
        <HoverActions
          isFavorite={true}
          disabledFavButton={isUpdating}
          toggleView={toggleDialog}
          toggleFavorite={() => handleFavorite(id)}
        />

        {/* PRODUCT IMAGE / THUMBNAIL */}
        <Link href={`/products/${id}`}>
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
      <ProductViewDialog
        openDialog={openModal}
        handleCloseDialog={toggleDialog}
        product={{ name, price, id, imgGroup: [imgUrl, imgUrl] }}
      />

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
          <ProductPrice
            discount={
              !discount || discountType === "NONE"
                ? 0
                : discountType === "PERCENTAGE"
                  ? discount
                  : ((price - discount) * 100) / price
            }
            price={price}
          />
        </Box>

        {/* PRODUCT QUANTITY HANDLER BUTTONS */}
        <QuantityButtons
          //quantity={cartItem?.qty || 0}
          handleIncrement={handleIncrementQuantity}
          //handleDecrement={handleDecrementQuantity}
        />
      </ContentWrapper>
    </StyledBazaarCard>
  );
};

export default ProductCard11;
