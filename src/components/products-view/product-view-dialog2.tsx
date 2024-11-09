import { FC } from "react";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import DialogContent from "@mui/material/DialogContent";
// MUI ICON COMPONENTS
import Add from "@mui/icons-material/Add";
import Close from "@mui/icons-material/Close";
import Remove from "@mui/icons-material/Remove";
// GLOBAL CUSTOM COMPONENTS
import { FlexBox } from "components/flex-box";
import { Carousel } from "components/carousel";
import BazaarImage from "components/BazaarImage";
import { H1, H2, H3, Paragraph } from "components/Typography";
// CUSTOM UTILS LIBRARY FUNCTION
import {
  calculateDiscountPercentage,
  calculateDiscountPrice,
  currency,
} from "lib";
import { Product1 } from "models/Product.model";
import ENVIRONMENT from "config/environment";
import useCartService from "hooks/useCartService";
import LoadingButton from "@mui/lab/LoadingButton";
import { useSession } from "next-auth/react";
import { User1 } from "models/User.model";
import useQuotation from "hooks/useQuotation";

// =====================================================
interface Props {
  product: Product1;
  openDialog: boolean;
  handleCloseDialog: () => void;
}
// =====================================================

const ProductViewDialog2: FC<Props> = ({
  product,
  openDialog,
  handleCloseDialog,
}: Props) => {
  const {
    id,
    name,
    basePrice,
    discountAmount,
    images,
    discountType,
    description,
    productType,
    category,
    variants,
  } = product;
  //
  const { data } = useSession();
  const user = data?.user as User1;
  //
  const imgUrls =
    images && images.length > 0
      ? images.map((image) => `${ENVIRONMENT.S3_BUCKET_URL}/${image}`)
      : [`${ENVIRONMENT.APP_URL}/assets/images/default-product.jpg`];

  const { handleAddToCart, handleRemoveFromCart, cart, isUpdating } =
    useCartService();

  const { requestQuota, isCreatingQuotation } = useQuotation(
    id,
    user?.email,
    user?.id
  );

  const carItemIds = cart.cartItems.map((item) => item.productVariant.id);

  const minPriceVariant =
    variants.length > 0 &&
    variants.reduce((minVariant, currentVariant) => {
      return currentVariant.price < minVariant.price
        ? currentVariant
        : minVariant;
    });

  const getPrice = () => {
    if (discountAmount) {
      const discount = calculateDiscountPercentage(
        discountType,
        minPriceVariant.price,
        discountAmount
      );

      return calculateDiscountPrice(minPriceVariant.price, discount);
    }
    return currency(basePrice);
  };

  const isQuotationProduct = productType === "QUOTATION";

  // HANDLE CHANGE CART
  const handleCartAmountChange = (amount: number) => () => {
    const units = cart.cartItems.find(
      (e) => e.productVariant.id === minPriceVariant.id
    )?.units;
    if (amount === -1 && units === 1) {
      handleRemoveFromCart(minPriceVariant);
    } else {
      if (!units) {
        handleCloseDialog();
      }
      handleAddToCart(product, minPriceVariant, amount);
    }
  };

  return (
    <Dialog
      open={openDialog}
      maxWidth={false}
      onClose={handleCloseDialog}
      sx={{ zIndex: 1501 }}
    >
      <DialogContent
        sx={{ maxWidth: 900, width: "100%", minWidth: 800, minHeight: 400 }}
      >
        <div>
          <Grid container spacing={3}>
            {imgUrls && (
              <Grid item md={6} xs={12}>
                <Carousel
                  slidesToShow={1}
                  arrowStyles={{
                    boxShadow: 0,
                    color: "primary.main",
                    backgroundColor: "transparent",
                  }}
                >
                  {imgUrls.map((item: string, index: number) => (
                    <BazaarImage
                      key={index}
                      src={item}
                      alt="product"
                      sx={{
                        mx: "auto",
                        width: "100%",
                        objectFit: "contain",
                        height: { sm: 400, xs: 250 },
                      }}
                    />
                  ))}
                </Carousel>
              </Grid>
            )}

            <Grid item md={6} xs={12} alignSelf="center">
              <H2>{name}</H2>

              <Paragraph py={1} color="grey.500" fontWeight={600} fontSize={13}>
                CATEGORY: {category?.name}
              </Paragraph>

              <H1 color="primary.main">{getPrice()}</H1>

              {/* <FlexBox alignItems="center" gap={1} mt={1}>
                <Rating color="warn" value={4} readOnly />
                <H6 lineHeight="1">(50)</H6>
              </FlexBox> */}

              <Paragraph my={2}>{description}</Paragraph>

              <Divider sx={{ mb: 2 }} />

              {/* ADD TO CART BUTTON */}
              <FlexBox alignItems="center" sx={{ mb: 4.5 }}>
                {!carItemIds?.includes(minPriceVariant.id) ? (
                  <LoadingButton
                    color="primary"
                    variant="contained"
                    loading={isCreatingQuotation || isUpdating}
                    onClick={
                      isQuotationProduct
                        ? requestQuota
                        : handleCartAmountChange(1)
                    }
                    sx={{ px: "1.75rem", height: 40 }}
                  >
                    {isQuotationProduct ? "Get Quote" : "Add to Cart"}
                  </LoadingButton>
                ) : (
                  <>
                    <Button
                      disabled={isUpdating}
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
                        cart.cartItems.find(
                          (e) => e.productVariant.id === minPriceVariant.id
                        ).units
                      }
                    </H3>

                    <Button
                      disabled={isUpdating}
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
              </FlexBox>
            </Grid>
          </Grid>
        </div>

        <IconButton
          sx={{ position: "absolute", top: 3, right: 3 }}
          onClick={handleCloseDialog}
        >
          <Close fontSize="small" color="secondary" />
        </IconButton>
      </DialogContent>
    </Dialog>
  );
};

export default ProductViewDialog2;
