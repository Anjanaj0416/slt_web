import Link from "next/link";
import { FC, useState } from "react";
import { useSnackbar } from "notistack";
import { Box, Button, IconButton, Rating, styled } from "@mui/material";
import { AddShoppingCart, Favorite, FavoriteBorder } from "@mui/icons-material";
// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";
// GLOBAL CUSTOM HOOK
import useCart from "hooks/useCart";
// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
import { FlexRowCenter } from "components/flex-box";
import { H4, Paragraph, Small } from "components/Typography";
import ProductViewDialog from "components/products-view/product-view-dialog";
// CUSTOM DATA MODEL
import Product from "models/Product.model";

// CUSTOM COMPONENTS
const Card = styled(Box)({
  ":hover": {
    "& .product-actions": { right: 10 },
    "& img": { transform: "scale(1.1)" },
    "& .product-view-action": { opacity: 1 },
  },
});

const CardMedia = styled(Box)(({ theme }) => ({
  maxHeight: 300,
  cursor: "pointer",
  overflow: "hidden",
  position: "relative",
  backgroundColor: theme.palette.grey[300],
  "& img": { transition: "0.3s" },
}));

const AddToCartButton = styled(IconButton)({
  top: 10,
  right: -40,
  position: "absolute",
  transition: "right 0.3s .1s",
});

const FavoriteButton = styled(IconButton)({
  top: 45,
  right: -40,
  position: "absolute",
  transition: "right 0.3s .2s",
});

const QuickViewButton = styled(Button)({
  left: 0,
  bottom: 0,
  opacity: 0,
  borderRadius: 0,
  position: "absolute",
  transition: "all 0.3s",
});

// ==============================================================
type ProductCardProps = { product: Product };
// ==============================================================

const ProductCard18: FC<ProductCardProps> = ({ product }) => {
  const { state, dispatch } = useCart();
  const { enqueueSnackbar } = useSnackbar();
  const [openDialog, setOpenDialog] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const cartItem = state.cart.find((item) => item.slug === product.slug);

  // HANDLE FAVORITE PRODUCT
  const handleFavorite = () => setIsFavorite((fav) => !fav);

  // HANDLE ADD TO CART PRODUCT
  const handleAddToCart = (product: Product) => () => {
    const payload = {
      id: product.id,
      slug: product.slug,
      name: product.title,
      price: product.price,
      imgUrl: product.thumbnail,
      qty: (cartItem?.qty || 0) + 1,
    };

    dispatch({ type: "CHANGE_CART_AMOUNT", payload });
    enqueueSnackbar("Added to Cart", { variant: "success" });
  };

  return (
    <Card>
      <CardMedia>
        <Link href={`/products/${product.slug}`}>
          <LazyImage
            width={300}
            height={300}
            alt="category"
            className="product-img"
            src={product.thumbnail}
          />
        </Link>

        <AddToCartButton className="product-actions" onClick={handleAddToCart(product)}>
          <AddShoppingCart color="disabled" fontSize="small" />
        </AddToCartButton>

        <FavoriteButton className="product-actions" onClick={handleFavorite}>
          {isFavorite ? (
            <Favorite color="primary" fontSize="small" />
          ) : (
            <FavoriteBorder color="disabled" fontSize="small" />
          )}
        </FavoriteButton>

        <QuickViewButton
          fullWidth
          size="large"
          color="dark"
          variant="contained"
          className="product-view-action"
          onClick={() => setOpenDialog(true)}
        >
          Quick View
        </QuickViewButton>
      </CardMedia>

      <ProductViewDialog
        openDialog={openDialog}
        handleCloseDialog={() => setOpenDialog(false)}
        product={{
          id: product.id,
          slug: product.slug,
          title: product.title,
          price: product.price,
          imgGroup: product.images,
        }}
      />

      <Box p={1} textAlign="center">
        {product.categories.length > 0 ? (
          <Small color="grey.500">{product.categories[0]}</Small>
        ) : null}

        <Paragraph fontWeight="bold">{product.title}</Paragraph>

        <H4 fontWeight={700} py={0.5}>
          {currency(product.price)}
        </H4>

        <FlexRowCenter gap={1}>
          <Rating name="read-only" value={4} readOnly sx={{ fontSize: 16 }} />
          <Small fontWeight={600} color="grey.500">
            ({product.reviews.length} Reviews)
          </Small>
        </FlexRowCenter>
      </Box>
    </Card>
  );
};

export default ProductCard18;
