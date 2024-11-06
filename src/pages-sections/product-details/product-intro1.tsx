"use client";

import Link from "next/link";
import { FC, useEffect, useRef, useState } from "react";
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
import { Product1, ProductVariant } from "models/Product.model";
import ENVIRONMENT from "config/environment";
import useCartService from "hooks/useCartService";
import useQuotation from "hooks/useQuotation";
import { LoadingButton } from "@mui/lab";
import { useSession } from "next-auth/react";
import { User1 } from "models/User.model";

import ShareIcon from "@mui/icons-material/Share";
import ShareModal, { ShareModalRef } from "./ShareModal";
import { Chip, CircularProgress, Tooltip } from "@mui/material";
import { useSnackbar } from "notistack";

// ================================================================
type Props = { product: Product1 };
// ================================================================

interface MappedAttribute {
  id: string;
  title: string;
  values: string[];
}

const ProductIntro1: FC<Props> = ({ product }) => {
  const { basePrice, name, brand, images, videos, productType, variants, id } =
    product || {};

  const { enqueueSnackbar } = useSnackbar();

  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [variantId, setVariantId] = useState<string>();
  const [price, setPrice] = useState<number>();
  const [quantity, setQuantity] = useState<number>();

  useEffect(() => {
    if (productType === "DIRECT_BUYING") {
      const maxStockVariant = variants.reduce((maxVariant, currentVariant) => {
        return currentVariant.units > maxVariant.units
          ? currentVariant
          : maxVariant;
      });
      setQuantity(maxStockVariant.units);
    }
  }, []);

  const mapAttributes = (variants: ProductVariant[]): MappedAttribute[] => {
    const attributeMap: { [key: string]: Set<string> } = {};

    variants.forEach((variant) => {
      variant.attributes?.forEach((attribute) => {
        if (!attributeMap[attribute.name]) {
          attributeMap[attribute.name] = new Set();
        }
        attributeMap[attribute.name].add(attribute.value);
      });
    });

    return Object.entries(attributeMap).map(([name, values]) => ({
      id: variants.find(
        (variant) => variant.attributes?.some((attr) => attr.name === name)
      )!.id,
      title: name,
      values: Array.from(values),
    }));
  };

  function findVariantByAttributes(variants, attributesToFind) {
    return variants.find((variant) => {
      const attributeMap = Object.fromEntries(
        variant.attributes.map((attr) => [attr.name, attr.value])
      );

      return attributesToFind.every(
        (attr) => attributeMap[attr.name] === attr.value
      );
    });
  }

  const mappedAttributes = mapAttributes(variants);

  useEffect(() => {
    if (selectedAttributes.length < 1) {
      return;
    }

    const selectedVariant = findVariantByAttributes(
      variants,
      selectedAttributes
    );
    if (selectedVariant) {
      setVariantId(selectedVariant.id);
      setPrice(selectedVariant.price);
      setQuantity(selectedVariant.units);
    } else {
      setSelectedAttributes([]);
      enqueueSnackbar("Selected Variant Not Found", {
        variant: "error",
      });
    }
  }, [selectedAttributes]);

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
  const handleChangeVariant = (name: string, value: string) => () => {
    setSelectedAttributes((state) => {
      // Find the index of the existing attribute in the state
      const existingAttributeIndex = state.findIndex((e) => e.name === name);

      // Check if the attribute already exists
      if (existingAttributeIndex !== -1) {
        const existingAttribute = state[existingAttributeIndex];

        // If the value is the same, remove it
        if (existingAttribute.value === value) {
          return state.filter((_, index) => index !== existingAttributeIndex);
        } else {
          // If the value is different, create a new state with the updated value
          return [
            ...state.slice(0, existingAttributeIndex),
            { ...existingAttribute, value }, // Update the existing attribute value
            ...state.slice(existingAttributeIndex + 1),
          ];
        }
      }

      // If the attribute does not exist, add it to the state
      return [
        ...state,
        {
          name,
          value,
        },
      ];
    });
  };

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
          {mappedAttributes.map((variant) => (
            <Box key={variant.id} mb={2}>
              <H6 mb={1}>{variant.title}</H6>

              {variant.values.map((value, index) => (
                <Chip
                  key={index}
                  label={value}
                  onClick={handleChangeVariant(variant.title, value)}
                  sx={{ borderRadius: "4px", mr: 1, cursor: "pointer" }}
                  color={
                    selectedAttributes.find((e) => e.value === value)
                      ? "primary"
                      : "default"
                  }
                />
              ))}
            </Box>
          ))}

          {/* PRICE & STOCK */}
          {!isQuotationProduct && (
            <Box pt={1} mb={3}>
              <H2 color="primary.main" mb={0.5} lineHeight="1">
                {price ? currency(price) : `LKR${basePrice}`}
              </H2>

              {quantity !== undefined ? (
                <Box color="inherit">
                  {quantity > 0 ? "Stock Available" : "Out of Stocks"}
                </Box>
              ) : (
                <CircularProgress size={20} />
              )}
            </Box>
          )}

          {/* ADD TO CART BUTTON */}
          <FlexBox alignItems="center" sx={{ mb: 4.5 }}>
            {!carItemIds?.includes(product.id) ? (
              <LoadingButton
                color="primary"
                variant="contained"
                disabled={quantity < 1}
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
                  disabled={isButtonLoading || quantity < 1}
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
                  disabled={isButtonLoading || quantity < 1}
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
