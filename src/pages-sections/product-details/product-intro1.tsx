"use client";

import Link from "next/link";
import { FC, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
// MUI ICON COMPONENTS
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";
// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
import { H1, H2, H3, H6 } from "components/Typography";
import { FlexBox, FlexRowCenter } from "components/flex-box";
// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";
// CUSTOM DATA MODEL
import { Product1 } from "models/Product.model";
import ENVIRONMENT from "config/environment";
import useCartService from "hooks/useCartService";
import useQuotation from "hooks/useQuotation";
import { LoadingButton } from "@mui/lab";
import { useSession } from "next-auth/react";
import { User1 } from "models/User.model";

import ShareIcon from "@mui/icons-material/Share";
import ShareModal, { ShareModalRef } from "./ShareModal";
import { Tooltip } from "@mui/material";

// ================================================================
type Props = { product: Product1 };
// ================================================================

const ProductIntro1: FC<Props> = ({ product }) => {
  const { price, name, brand, images, videos, productType, id } = product || {};
  const { data } = useSession();
  const user = data?.user as User1;
  const {
    handleAddToCart,
    handleRemoveFromCart,
    cart,
    selectedProductId,
    isUpdating,
  } = useCartService();
  const carItemIds = cart.cartItems.map((item) => item.product.id);
  const [selectedImage, setSelectedImage] = useState(0);
  const { requestQuota, isCreatingQuotation } = useQuotation(
    product.id,
    user?.email,
    user?.id
  );
  const modalRef = useRef<ShareModalRef>();
  const isButtonLoading = selectedProductId === product?.id && isUpdating;
  //
  const isQuotationProduct = productType === "QUOTATION";
  //
  const medias = [
    ...videos.map((video) => ({ src: video, type: "video" })),
    ...images.map((image) => ({ src: image, type: "image" })),
  ];

  // HANDLE CHANGE TYPE AND OPTIONS
  // const handleChangeVariant = (variantName: string, value: string) => () => {
  //   setSelectVariants((state) => ({
  //     ...state,
  //     [variantName.toLowerCase()]: value,
  //   }));
  // };

  // HANDLE SELECT IMAGE
  const handleImageClick = (ind: number) => () => setSelectedImage(ind);

  // HANDLE CHANGE CART
  const handleCartAmountChange = (amount: number) => () => {
    if (
      amount === -1 &&
      cart.cartItems.find((e) => e.product.id === product.id).units === 1
    ) {
      handleRemoveFromCart(product);
    } else {
      handleAddToCart(product, amount);
    }
  };

  return (
    <Box width="100%">
      <Grid container spacing={3} justifyContent="space-around">
        <ShareModal ref={modalRef} />
        {/* IMAGE GALLERY AREA */}
        <Grid item md={6} xs={12} alignItems="center">
          <FlexBox justifyContent="center" mb={6}>
            {medias.length < 1 ? (
              <LazyImage
                alt={name}
                width={300}
                height={300}
                loading="eager"
                src={`${ENVIRONMENT.APP_URL}/assets/images/default-product.jpg`}
                sx={{ objectFit: "contain" }}
              />
            ) : medias[selectedImage].type === "image" ? (
              <LazyImage
                alt={name}
                width={300}
                height={300}
                loading="eager"
                src={`${ENVIRONMENT.S3_BUCKET_URL}/${medias[selectedImage].src}`}
                sx={{ objectFit: "contain" }}
              />
            ) : (
              <video
                autoPlay
                muted
                controls
                width="100%"
                height={604}
                src={`${ENVIRONMENT.S3_BUCKET_URL}/${medias[selectedImage].src}`}
              />
            )}
          </FlexBox>

          {medias.length > 0 && (
            <FlexBox overflow="auto">
              {medias.map((media, ind) => (
                <FlexRowCenter
                  key={ind}
                  width={64}
                  height={64}
                  minWidth={64}
                  bgcolor="white"
                  border="1px solid"
                  borderRadius="10px"
                  ml={ind === 0 ? "auto" : 0}
                  style={{ cursor: "pointer" }}
                  onClick={handleImageClick(ind)}
                  mr={ind === medias.length - 1 ? "auto" : "10px"}
                  borderColor={
                    selectedImage === ind ? "primary.main" : "grey.400"
                  }
                >
                  {media.type === "image" ? (
                    <Avatar
                      alt="product"
                      src={`${ENVIRONMENT.S3_BUCKET_URL}/${media.src}`}
                      variant="square"
                      sx={{ height: 40 }}
                    />
                  ) : (
                    <video
                      src={`${ENVIRONMENT.S3_BUCKET_URL}/${media.src}`}
                      width={40}
                      height={40}
                    />
                  )}
                </FlexRowCenter>
              ))}
            </FlexBox>
          )}
        </Grid>

        {/* PRODUCT INFO AREA */}
        <Grid item md={6} xs={12} alignItems="center">
          {/* PRODUCT NAME */}
          <H1 mb={1}>{name}</H1>

          {/* PRODUCT BRAND */}
          <FlexBox alignItems="center" mb={1}>
            <div style={{ marginRight: "8px" }}>Brand:</div>
            <H6>{brand}</H6>
          </FlexBox>

          {/* PRODUCT RATING */}
          <FlexBox alignItems="center" gap={1} mb={2}>
            <Box lineHeight="1">Rated:</Box>
            <Rating color="warn" value={4} readOnly />
            <H6 lineHeight="1">(50)</H6>
          </FlexBox>

          {/* PRODUCT VARIANTS */}
          {/* {productVariants.map((variant) => (
            <Box key={variant.id} mb={2}>
              <H6 mb={1}>{variant.title}</H6>

              {variant.values.map(({ id, value }) => (
                <Chip
                  key={id}
                  label={value}
                  onClick={handleChangeVariant(variant.title, value)}
                  sx={{ borderRadius: "4px", mr: 1, cursor: "pointer" }}
                  color={
                    selectVariants[variant.title.toLowerCase()] === value
                      ? "primary"
                      : "default"
                  }
                />
              ))}
            </Box>
          ))} */}

          {/* PRICE & STOCK */}
          {!isQuotationProduct && (
            <Box pt={1} mb={3}>
              <H2 color="primary.main" mb={0.5} lineHeight="1">
                {currency(price)}
              </H2>
              <Box color="inherit">Stock Available</Box>
            </Box>
          )}

          {/* ADD TO CART BUTTON */}
          <FlexBox alignItems="center" sx={{ mb: 4.5 }}>
            {!carItemIds?.includes(product.id) ? (
              <LoadingButton
                color="primary"
                variant="contained"
                loading={isButtonLoading || isCreatingQuotation}
                onClick={
                  isQuotationProduct ? requestQuota : handleCartAmountChange(1)
                }
                sx={{ px: "1.75rem", height: 40 }}
              >
                {isQuotationProduct ? "Get Quote" : "Add to Cart"}
              </LoadingButton>
            ) : (
              <>
                <Button
                  disabled={isButtonLoading}
                  size="small"
                  sx={{ p: 1 }}
                  color="primary"
                  variant="outlined"
                  onClick={handleCartAmountChange(-1)}
                >
                  <Remove fontSize="small" />
                </Button>

                <H3 fontWeight="600" mx={2.5}>
                  {
                    cart.cartItems.find((e) => e.product.id === product.id)
                      .units
                  }
                </H3>

                <Button
                  disabled={isButtonLoading}
                  size="small"
                  sx={{ p: 1 }}
                  color="primary"
                  variant="outlined"
                  onClick={handleCartAmountChange(1)}
                >
                  <Add fontSize="small" />
                </Button>
              </>
            )}
            <Tooltip title="Share">
              <Button
                sx={{ height: 40, marginLeft: 1 }}
                onClick={() =>
                  modalRef.current.openModal(
                    `${ENVIRONMENT.APP_URL}/products/${id}`
                  )
                }
              >
                <ShareIcon />
              </Button>
            </Tooltip>
          </FlexBox>

          {/* SHOP NAME */}
          <FlexBox alignItems="center" gap={1} mb={2}>
            <div>Sold By:</div>
            <Link href="/shops/scarlett-beauty">
              <H6>Mobile Store</H6>
            </Link>
          </FlexBox>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductIntro1;
