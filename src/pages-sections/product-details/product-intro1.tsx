"use client";

import Link from "next/link";
import { FC, useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
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
import { calculateDiscountAmount, currency } from "lib";
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
import Store from "models/Store.model";
import useBuyNowItemService from "hooks/useBuyNowItemService";
import { useUnAuthenticatedModal } from "components/modals/unauthenticated-action-modal";
import SelfPickupInfo from "./self-pickup-info";

// ================================================================
type Props = { product: Product1; store: Store };
// ================================================================

interface MappedAttribute {
  id: string;
  title: string;
  values: { value: string; disabled: boolean }[];
}

const ProductIntro1: FC<Props> = ({ product, store }) => {
  const {
    basePrice,
    name,
    brand,
    images,
    videos,
    productType,
    variants,
    id,
    discountAmount,
    discountType,
  } = product || {};

  const { enqueueSnackbar } = useSnackbar();

  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>();
  const [price, setPrice] = useState<number>();
  const [quantity, setQuantity] = useState<number>();
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const [mappedAttributes, setMappedAttributes] = useState<MappedAttribute[]>();
  const medias = [
    ...videos.map((video) => ({ src: video, type: "video" })),
    ...images.map((image) => ({ src: image, type: "image" })),
  ];
  useEffect(() => {
    const availableAttributes = mapAttributes(variants);
    setMappedAttributes(availableAttributes);
    if (productType === "DIRECT_BUYING") {
      const maxStockVariant = variants.reduce((maxVariant, currentVariant) => {
        return currentVariant.units > maxVariant.units
          ? currentVariant
          : maxVariant;
      });
      setQuantity(maxStockVariant.units);
    }
    if (variants.length === 1) {
      setSelectedVariant(variants[0]);
      setPrice(variants[0].price);
    }
    if (availableAttributes?.length === 1) {
      setSelectedAttributes(availableAttributes);
    }
  }, []);

  const getPrice = () => {
    const prices = basePrice.split("-");
    if (prices.length == 1) {
      return currency(+prices[0] * selectedUnits);
    }
    return `${currency(prices[0])} - ${currency(prices[1], 2, "")}`;
  };

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
      values: Array.from(values).map((e) => ({ value: e, disabled: false })),
    }));
  };

  const getDiscountedPrice = () => {
    if (discountAmount) {
      const discount = calculateDiscountAmount(
        discountType,
        selectedVariant.price,
        discountAmount
      );
      return selectedVariant.price - discount;
    }
    return selectedVariant.price;
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

  useEffect(() => {
    const availableAttributes = getNextAvailableAttributes(
      product,
      selectedAttributes
    );

    setMappedAttributes((prevMappedAttributes) =>
      prevMappedAttributes.map((attr) => {
        const matchingAvailableAttr = availableAttributes.find(
          (availableAttr) => availableAttr.name === attr.title
        );

        return {
          ...attr,
          values: attr.values.map((value) => ({
            ...value,
            disabled: !(
              matchingAvailableAttr &&
              matchingAvailableAttr?.values?.includes(value.value)
            ),
          })),
        };
      })
    );

    if (
      variants.length > 1 &&
      (!mappedAttributes ||
        selectedAttributes.length < mappedAttributes?.length)
    ) {
      setSelectedVariant(null);
      setPrice(null);
      return;
    }

    const selectedVariant = findVariantByAttributes(
      variants,
      selectedAttributes
    );
    if (selectedVariant) {
      setSelectedVariant(selectedVariant);
      setPrice(selectedVariant.price);
      setQuantity(selectedVariant.units);

      if (availableAttributes.length > 1) {
        const imageIndex = medias.findIndex(
          (e) => e.src === selectedVariant.image
        );

        setSelectedImage(imageIndex < 0 ? 0 : imageIndex);
      }
    }
  }, [selectedAttributes]);

  function getNextAvailableAttributes(
    product: Product1,
    providedAttributes: { name: string; value: string }[]
  ): { name: string; values: string[] }[] {
    if (!product.variants || product.variants.length === 0) {
      return [];
    }

    // Step 1: Find variants matching the provided attributes
    const matchingVariants = product.variants.filter((variant) =>
      providedAttributes.every((attr) =>
        variant.attributes.some(
          (variantAttr) =>
            variantAttr.name === attr.name && variantAttr.value === attr.value
        )
      )
    );

    // If no matching variants are found
    if (matchingVariants.length === 0) {
      return providedAttributes.map((attr) => ({
        name: attr.name,
        values: [attr.value],
      }));
    }

    // Step 2: Collect all next available attributes from matching variants
    const nextAttributesMap: Record<string, Set<string>> = {};

    matchingVariants.forEach((variant) => {
      variant.attributes.forEach((attr) => {
        const isAlreadyProvided = providedAttributes.some(
          (providedAttr) =>
            providedAttr.name === attr.name && providedAttr.value === attr.value
        );

        // Add only attributes that are not already provided
        if (!isAlreadyProvided) {
          if (!nextAttributesMap[attr.name]) {
            nextAttributesMap[attr.name] = new Set();
          }
          nextAttributesMap[attr.name].add(attr.value);
        }
      });
    });

    // Step 3: Include provided attributes as available
    providedAttributes.forEach((attr) => {
      if (!nextAttributesMap[attr.name]) {
        nextAttributesMap[attr.name] = new Set();
      }
      nextAttributesMap[attr.name].add(attr.value);
    });

    // Convert to the required format
    return Object.entries(nextAttributesMap).map(([name, values]) => ({
      name,
      values: Array.from(values),
    }));
  }

  const { data } = useSession();
  const user = data?.user as User1;
  const {
    handleAddToCart,
    handleRemoveFromCart,
    cart,
    selectedProductId,
    isUpdating,
  } = useCartService();
  const { handleAddToItem } = useBuyNowItemService();
  const { setIsOpen: openUnAuthenticatedModal } = useUnAuthenticatedModal();

  const [selectedImage, setSelectedImage] = useState(0);
  const { requestQuota, isCreatingQuotation } = useQuotation(
    selectedVariant?.id,
    user?.id
  );
  const modalRef = useRef<ShareModalRef>();
  const isButtonLoading =
    selectedProductId === selectedVariant?.id && isUpdating;
  //
  const isQuotationProduct = productType === "QUOTATION";
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
  const handleCartAmountChange = (units: number) => {
    if (!selectedVariant) {
      enqueueSnackbar("Please Select Variant", {
        variant: "warning",
      });
      return;
    }
    if (
      units === -1 &&
      cart.cartItems.find((e) => e.productVariant.id === selectedVariant?.id)
        .units === 1
    ) {
      handleRemoveFromCart(selectedVariant);
    } else {
      handleAddToCart(product, selectedVariant, units);
    }
  };

  // HANDLE BUY NOW
  const handleBuyNow = () => {
    if (!selectedVariant && variants.length > 1) {
      enqueueSnackbar("Please Select Variant", {
        variant: "warning",
      });
      return;
    }
    if (!user?.id) {
      openUnAuthenticatedModal(true);
      return;
    }
    handleAddToItem([
      { product, productVariant: selectedVariant, units: selectedQuantity },
    ]);
  };
  // HANDLE REQUEST QUOTE
  const selectedUnits =
    cart.cartItems.find((e) => e?.productVariant?.id === selectedVariant?.id)
      ?.units ?? 1;
  return (
    <Box width="100%">
      <Grid container spacing={3} justifyContent="space-around">
        <ShareModal ref={modalRef} />
        {/* IMAGE GALLERY AREA */}
        <Grid item md={6} xs={12} alignItems="center">
          <FlexBox
            justifyContent="center"
            mb={2.5}
            width="100%"
            height={{ xs: 340, md: 600 }}
          >
            {medias.length < 1 ? (
              <LazyImage
                alt={name}
                width={280}
                height={280}
                loading="eager"
                src={`${ENVIRONMENT.APP_URL}/assets/images/default-product.jpg`}
                sx={{ objectFit: "contain" }}
              />
            ) : medias[selectedImage].type === "image" ? (
              <LazyImage
                alt={name}
                width={280}
                height={280}
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

          {medias?.length > 0 && (
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
                    <LazyImage
                      quality={50}
                      alt="product"
                      src={`${ENVIRONMENT.S3_BUCKET_URL}/${media.src}`}
                      width={40}
                      height={40}
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
          </FlexBox>

          {/* PRODUCT VARIANTS */}
          {mappedAttributes?.map((variant) => (
            <Box key={variant?.id} mb={2}>
              <H6 sx={{ textTransform: "capitalize" }} mb={1}>
                {variant.title}
              </H6>
              {variant?.values?.map((value, index) => (
                <Chip
                  key={index}
                  label={value.value}
                  disabled={
                    value.disabled &&
                    !(
                      selectedAttributes.find(
                        (e) => e.name === variant.title
                      ) && selectedAttributes.length === 1
                    )
                  }
                  onClick={handleChangeVariant(variant.title, value.value)}
                  sx={{
                    borderRadius: "4px",
                    mr: 1,
                    cursor: "pointer",
                    textTransform: "capitalize",
                  }}
                  color={
                    selectedAttributes.find((e) => e.value === value.value)
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
                {price
                  ? currency(
                      discountAmount
                        ? getDiscountedPrice() * selectedUnits
                        : price * selectedUnits
                    )
                  : getPrice()}
              </H2>
              {selectedVariant && discountAmount ? (
                <Box
                  component="del"
                  fontWeight={600}
                  color="grey.600"
                  fontSize={20}
                >
                  {currency(price)}
                </Box>
              ) : null}
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
          <FlexBox mb={2}>
            <Button
              disabled={selectedQuantity < 2}
              size="small"
              sx={{ p: 1 }}
              color="primary"
              variant="outlined"
              onClick={() =>
                setSelectedQuantity((prvQuantity) => prvQuantity - 1)
              }
            >
              <Remove fontSize="small" />
            </Button>

            <H3 fontWeight="600" mx={2.5}>
              {selectedQuantity}
            </H3>

            <Button
              disabled={!selectedVariant?.id || quantity <= selectedQuantity}
              size="small"
              sx={{ p: 1 }}
              color="primary"
              variant="outlined"
              onClick={() =>
                setSelectedQuantity((prvQuantity) => prvQuantity + 1)
              }
            >
              <Add fontSize="small" />
            </Button>
          </FlexBox>
          <FlexBox alignItems="center" sx={{ mb: 4.5 }}>
            <LoadingButton
              color="primary"
              disabled={!isQuotationProduct && quantity < 1}
              loading={isButtonLoading || isCreatingQuotation}
              onClick={() =>
                isQuotationProduct
                  ? requestQuota()
                  : handleCartAmountChange(selectedQuantity)
              }
              sx={{ px: "1.75rem", height: 40, width: 140, border: 1 }}
            >
              {isQuotationProduct ? "Get Quote" : "Add to Cart"}
            </LoadingButton>

            {!isQuotationProduct && (
              <Button
                color="primary"
                variant="contained"
                disabled={quantity < 1}
                onClick={() => handleBuyNow()}
                sx={{ px: "1.75rem", height: 40, ml: 1.5, width: 136 }}
              >
                Buy Now
              </Button>
            )}
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Tooltip title="Share">
                <Button
                  sx={{ height: 40, marginLeft: 1 }}
                  onClick={() =>
                    modalRef.current.openModal(
                      `${ENVIRONMENT.APP_URL}/products/${id}_${name}`
                    )
                  }
                >
                  <ShareIcon />
                </Button>
              </Tooltip>
            </Box>
          </FlexBox>

          {/* SHOP NAME */}
          <FlexBox alignItems="center" gap={1} mb={2}>
            <div>Sold By:</div>
            <Link href={`/shops/${store?.id}_${store?.name}`}>
              <H6>{store?.name}</H6>
            </Link>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <Tooltip title="Share">
                <Button
                  sx={{ height: 36, marginLeft: 1 }}
                  onClick={() =>
                    modalRef.current.openModal(
                      `${ENVIRONMENT.APP_URL}/products/${id}_${name}`
                    )
                  }
                >
                  <ShareIcon fontSize="small" />
                </Button>
              </Tooltip>
            </Box>
          </FlexBox>

          {product.deliveryPartner === "SELF_PICKUP" && (
            <Box mt={5}>
              <SelfPickupInfo address={store?.address} />
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductIntro1;
