import { FC } from "react";
import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import styled from "@mui/material/styles/styled";
import IconButton from "@mui/material/IconButton";
import DialogContent from "@mui/material/DialogContent";
// MUI ICON COMPONENTS
import Add from "@mui/icons-material/Add";
import Close from "@mui/icons-material/Close";
import Remove from "@mui/icons-material/Remove";
// GLOBAL CUSTOM COMPONENTS
import { FlexBox } from "components/flex-box";
import BazaarImage from "components/BazaarImage";
import Carousel from "components/carousel/carousel";
import { H1, H2, H3, H6, Paragraph } from "components/Typography";
// LOCAL CUSTOM HOOKS
import useCart from "hooks/useCart";
// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";

// styled components
const ContentWrapper = styled("div")(({ theme }) => ({
  "& .carousel:hover": {
    cursor: "pointer",
    "& .carousel__back-button": { opacity: 1, left: 10 },
    "& .carousel__next-button": { opacity: 1, right: 10 },
  },
  "& .carousel__next-button, & .carousel__back-button": {
    opacity: 0,
    boxShadow: "none",
    transition: "all 0.3s",
    background: "transparent",
    color: theme.palette.primary.main,
    ":disabled": { color: theme.palette.grey[500] },
    ":hover": {
      color: theme.palette.primary.main,
      backgroundColor: "transparent",
    },
  },
  "& .carousel__back-button": { left: 0 },
  "& .carousel__next-button": { right: 0 },
}));

// =====================================================
interface Props {
  product: any;
  openDialog: boolean;
  handleCloseDialog: () => void;
}
// =====================================================

const ProductViewDialog: FC<Props> = (props) => {
  const { product, openDialog, handleCloseDialog } = props;

  const { state, dispatch } = useCart();
  const cartItem = state.cart.find((item) => item.id === product.id);

  const handleCartAmountChange = (amount: number) => () => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: {
        ...product,
        qty: amount,
        name: product.title,
        imgUrl: product.imgGroup[0],
      },
    });
  };

  return (
    <Dialog open={openDialog} maxWidth={false} onClose={handleCloseDialog} sx={{ zIndex: 1501 }}>
      <DialogContent sx={{ maxWidth: 900, width: "100%" }}>
        <ContentWrapper>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <Carousel totalSlides={product.imgGroup.length} visibleSlides={1}>
                {product.imgGroup.map((item: string, index: number) => (
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

            <Grid item md={6} xs={12} alignSelf="center">
              <H2>{product.title}</H2>

              <Paragraph py={1} color="grey.500" fontWeight={600} fontSize={13}>
                CATEGORY: Cosmetic
              </Paragraph>

              <H1 color="primary.main">{currency(product.price)}</H1>

              <FlexBox alignItems="center" gap={1} mt={1}>
                <Rating color="warn" value={4} readOnly />
                <H6 lineHeight="1">(50)</H6>
              </FlexBox>

              <Paragraph my={2}>
                Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus
                libero eu augue. Morbi purus liberpuro ate vol faucibus adipiscing.
              </Paragraph>

              <Divider sx={{ mb: 2 }} />

              {!cartItem?.qty ? (
                <Button
                  size="large"
                  color="primary"
                  variant="contained"
                  onClick={handleCartAmountChange(1)}
                  sx={{ height: 45 }}
                >
                  Add to Cart
                </Button>
              ) : (
                <FlexBox alignItems="center">
                  <Button
                    size="small"
                    color="primary"
                    variant="outlined"
                    sx={{ p: ".6rem", height: 45 }}
                    onClick={handleCartAmountChange(cartItem?.qty - 1)}
                  >
                    <Remove fontSize="small" />
                  </Button>

                  <H3 fontWeight="600" mx={2.5}>
                    {cartItem?.qty.toString().padStart(2, "0")}
                  </H3>

                  <Button
                    size="small"
                    color="primary"
                    variant="outlined"
                    sx={{ p: ".6rem", height: 45 }}
                    onClick={handleCartAmountChange(cartItem?.qty + 1)}
                  >
                    <Add fontSize="small" />
                  </Button>
                </FlexBox>
              )}
            </Grid>
          </Grid>
        </ContentWrapper>

        <IconButton sx={{ position: "absolute", top: 3, right: 3 }} onClick={handleCloseDialog}>
          <Close fontSize="small" color="secondary" />
        </IconButton>
      </DialogContent>
    </Dialog>
  );
};

export default ProductViewDialog;
