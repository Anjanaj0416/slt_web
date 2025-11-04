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
import { Button, Typography } from "@mui/material";
import useQuotation from "hooks/useQuotation";
import { User1 } from "models/User.model";
import { useSession } from "next-auth/react";

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
    productStatus,
    images,
    discountType,
    productType,
    variants,
  } = product;
  const { toggleDialog } = useProduct(id);
  const { data } = useSession();
  const user = data?.user as User1;
  const minPriceVariant =
    variants.length > 0 &&
    variants.reduce((minVariant, currentVariant) => {
      return currentVariant.units > 0 && currentVariant.price < minVariant.price
        ? currentVariant
        : minVariant;
    });

  const { requestQuota, isCreatingQuotation } = useQuotation(
    minPriceVariant?.id,
    user?.id
  );

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

  const getPrice = () => {
    const prices = basePrice?.split("-");

    return prices?.length ? currency(+prices[0], 1) : currency(+basePrice, 1);
  };
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
          disabledFavButton={isUpdating || productStatus !== "PUBLISH"}
          toggleView={toggleDialog}
          toggleFavorite={() => handleFavorite(id)}
        />

        {/* PRODUCT IMAGE / THUMBNAIL */}
        {productStatus === "PUBLISH" ? (
          <Link href={`/products/${id}_${name}`}>
            <LazyImage
              priority
              src={imgUrl}
              width={500}
              height={500}
              alt={name}
            />
          </Link>
        ) : (
          <Box
            position="relative"
            display="inline-block"
            width={500}
            height={500}
          >
            {/* Label */}
            <Typography
              variant="subtitle1"
              sx={{
                position: "absolute",
                top: 16,
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                color: "#fff",
                px: 4,
                py: 0.5,
                borderRadius: 1,
                fontWeight: 500,
              }}
            >
              Not Available
            </Typography>

            {/* Image */}
            <LazyImage
              priority
              src={imgUrl}
              width={500}
              height={500}
              alt={name}
              style={{
                objectFit: "cover",
                borderRadius: 8,
              }}
            />
          </Box>
        )}
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
          {productType === "DIRECT_BUYING" && (
            <Paragraph fontWeight={600} color="primary.main">
              {getPrice()}
            </Paragraph>
          )}
        </Box>

        {/* PRODUCT QUANTITY HANDLER BUTTONS */}
        {productType === "DIRECT_BUYING" ? (
          <QuantityButtons
            disabled={
              isUpdating ||
              minPriceVariant.units <= 0 ||
              productStatus !== "PUBLISH"
            }
            quantity={cartUnits || 0}
            handleIncrement={handleIncrementQuantity}
            handleDecrement={handleDecrementQuantity}
          />
        ) : (
          <Button
            variant="outlined"
            color="error"
            disabled={isCreatingQuotation}
            onClick={() => requestQuota()}
            sx={{ maxHeight: 36, px: 2 }}
          >
            Get Quote
          </Button>
        )}
      </ContentWrapper>
    </StyledBazaarCard>
  );
};

export default ProductCard11;
