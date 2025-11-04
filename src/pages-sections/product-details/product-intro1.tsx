"use client";
import { Box, Grid, Link, Rating } from "@mui/material";
import { useProductIntro } from "./hooks/useProductIntro";
import ProductGallery from "./product-gallary";
import VariantSelector from "./variant-selector";
import PriceSection from "./price-section";
import ActionButtons from "./action-buttons";
import { useSnackbar } from "notistack";
import { useSession } from "next-auth/react";
import useCartService from "hooks/useCartService";
import useBuyNowItemService from "hooks/useBuyNowItemService";
import useQuotation from "hooks/useQuotation";
import { useUnAuthenticatedModal } from "components/modals/unauthenticated-action-modal";
import ShareModal, { ShareModalRef } from "./ShareModal";
import { useRef, useState } from "react";
import ENVIRONMENT from "config/environment";
import { User1 } from "models/User.model";
import QuantitySelector from "./quantity-selector";
import { FlexBox } from "components/flex-box";
import { H1, H6 } from "components/Typography";
import SelfPickupInfo from "./self-pickup-info";
import SelfPickupInfoModal from "./self-pickup-info-modal";

const ProductIntro1 = ({ product, store }) => {
  const {
    medias,
    mappedAttributes,
    selectedAttributes,
    selectedVariant,
    selectedImage,
    selectedQuantity,
    price,
    quantity,
    discountedPrice,
    handleSelectAttribute,
    setSelectedQuantity,
    setSelectedImage,
  } = useProductIntro(product);

  const { enqueueSnackbar } = useSnackbar();
  const { data } = useSession();
  const [openSelfPickupInfo, setOpenSelfPickupInfo] = useState(
    product.deliveryPartner === "SELF_PICKUP"
  );
  const user = data?.user as User1;

  const { handleAddToCart, cart, isUpdating } = useCartService();
  const { handleAddToItem } = useBuyNowItemService();
  const { requestQuota, isCreatingQuotation } = useQuotation(
    selectedVariant?.id,
    user?.id
  );
  const { setIsOpen: openUnAuthenticatedModal } = useUnAuthenticatedModal();

  const modalRef = useRef<ShareModalRef>(null);
  const isQuotation = product.productType === "QUOTATION";

  const handleAdd = () => {
    if (!selectedVariant)
      return enqueueSnackbar("Please select variant", { variant: "warning" });
    handleAddToCart(product, selectedVariant, selectedQuantity, false);
  };

  const handleBuyNow = () => {
    if (!selectedVariant)
      return enqueueSnackbar("Please select variant", { variant: "warning" });
    if (!user?.id) return openUnAuthenticatedModal(true);
    handleAddToItem([
      { product, productVariant: selectedVariant, units: selectedQuantity },
    ]);
  };

  const handleShare = () => {
    modalRef.current?.openModal(
      `${ENVIRONMENT.APP_URL}/products/${product.id}_${product.name}`
    );
  };

  const selectedUnits =
    cart.cartItems.find((e) => e.productVariant?.id === selectedVariant?.id)
      ?.units ?? 1;

  return (
    <Box width="100%">
      <ShareModal ref={modalRef} />
      <SelfPickupInfoModal
        open={openSelfPickupInfo}
        onClose={() => setOpenSelfPickupInfo(false)}
        storeName={store.name}
        storeAddress={store?.address}
      />
      <Grid container spacing={3}>
        <Grid item md={6} xs={12}>
          <ProductGallery
            medias={medias}
            selectedImage={selectedImage}
            onSelect={setSelectedImage}
            name={product.name}
          />
        </Grid>

        <Grid item md={6} xs={12}>
          {/* ====== Product Title ====== */}
          <H1 mb={1} textTransform="capitalize">
            {product.name}
          </H1>

          {/* ====== Brand ====== */}
          <FlexBox alignItems="center" mb={1}>
            <Box mr={1}>Brand:</Box>
            <H6 textTransform="capitalize">{product.brand || "N/A"}</H6>
          </FlexBox>

          {/* ====== Rating ====== */}
          <FlexBox alignItems="center" gap={1} mb={2}>
            <Box lineHeight="1">Rated:</Box>
            <Rating color="warn" value={4} readOnly />
          </FlexBox>
          <VariantSelector
            mappedAttributes={mappedAttributes}
            selectedAttributes={selectedAttributes}
            onSelect={handleSelectAttribute}
          />

          <PriceSection
            price={price}
            discountedPrice={discountedPrice}
            discountAmount={product.discountAmount}
            quantity={quantity}
            selectedUnits={selectedUnits}
            isQuotation={isQuotation}
          />

          {!isQuotation && (
            <Box mt={2} mb={3}>
              <QuantitySelector
                selectedQuantity={selectedQuantity}
                quantity={quantity}
                onChange={setSelectedQuantity}
              />
            </Box>
          )}

          <ActionButtons
            isQuotation={isQuotation}
            isLoading={isUpdating || isCreatingQuotation}
            disabled={!selectedVariant || quantity < 1}
            onAdd={handleAdd}
            onBuy={handleBuyNow}
            onQuote={() => requestQuota()}
            onShare={handleShare}
          />
          <FlexBox>
            Sold By:
            <Link ml={1} href={`/shops/${store?.id}_${store?.name}`}>
              <H6>{store?.name}</H6>
            </Link>
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
