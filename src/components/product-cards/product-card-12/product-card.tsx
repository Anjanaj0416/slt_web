import { FC, useContext } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import styled from "@mui/material/styles/styled";
// GLOBAL CUSTOM COMPONENTS
import Image from "components/BazaarImage";
import { H5 } from "components/Typography";
import { FlexBox } from "components/flex-box";
// LOCAL CUSTOM COMPONENTS
import DiscountChip from "../discount-chip";
import ProductPrice from "../product-price";
import FavoriteButton from "./favorite-button";
import { Product1 } from "models/Product.model";
import ENVIRONMENT from "config/environment";
import { WishlistContext } from "contexts/WishlistContext";
import { enqueueSnackbar } from "notistack";
import { useSession } from "next-auth/react";
import { User1 } from "models/User.model";
import { useUpdateWishlistMutation } from "services/wishlist-api";
import LoadingButton from "@mui/lab/LoadingButton";
import useCartService from "hooks/useCartService";

// STYLED COMPONENT
const Wrapper = styled(Card)({
  width: "100%",
  overflow: "hidden",
  position: "relative",
  marginBottom: "1.25rem",
});

// ===========================================================
type Props = { product: Product1 };
// ===========================================================

const ProductCard9: FC<Props> = ({ product }: Props) => {
  const { id, price, name, images } = product;
  const { data: session } = useSession();
  const { wishlist, setWishlist } = useContext(WishlistContext);
  const [updateWishlist, { error }] = useUpdateWishlistMutation();
  const { handleAddToCart, isItemInCart, selectedProductId, isLoading } =
    useCartService();
  //
  const user = session?.user as User1;
  const imgUrl = images?.[0]
    ? `${ENVIRONMENT.S3_BUCKET_URL}/${images[0]}`
    : `${ENVIRONMENT.APP_URL}/assets/images/default-product.jpg`;
  // Map wishlist products to product ids
  const wishListProductIds = wishlist?.products?.map((product) => product.id);
  //
  const isOutOfStock = product?.units <= 0;
  //
  const cartUnits = isItemInCart(product)?.units;

  // const { cartItem, handleCartAmountChange, isFavorite, toggleFavorite } =
  //   useProduct(slug);

  // const handleIncrementQuantity = () => {
  //   const product = {
  //     id,
  //     slug,
  //     price,
  //     imgUrl,
  //     name: title,
  //     qty: (cartItem?.qty || 0) + 1,
  //   };
  //   handleCartAmountChange(product);
  // };

  // const handleDecrementQuantity = () => {
  //   const product = {
  //     id,
  //     slug,
  //     price,
  //     imgUrl,
  //     name: title,
  //     qty: (cartItem?.qty || 0) - 1,
  //   };
  //   handleCartAmountChange(product, "remove");
  // };

  const toggleFavorite = async () => {
    if (user?.id) {
      const oldWishlistProducts = [...wishlist?.products];
      //
      let newWishListProducts;
      if (wishListProductIds.includes(id)) {
        newWishListProducts = wishlist?.products.filter(
          (product) => product.id != id
        );
      } else {
        if (wishlist?.products.length >= Number(ENVIRONMENT.WISHLIST_LIMIT)) {
          enqueueSnackbar(
            `Wishlist max limit exceeded! Max product limit is ${ENVIRONMENT.WISHLIST_LIMIT}`,
            {
              variant: "error",
            }
          );
          return;
        }
        newWishListProducts = [...wishlist?.products, product];
      }
      //
      setWishlist((prvState) => ({
        ...prvState,
        products: newWishListProducts,
      }));
      //
      const productIds = newWishListProducts.map((product) => product.id);
      //
      await updateWishlist({
        userId: user.id,
        wishlistId: user.wishlist.id,
        body: { productIds },
      });
      //
      if (error) {
        setWishlist((prvState) => ({
          ...prvState,
          products: oldWishlistProducts,
        }));
        enqueueSnackbar("Something went to wrong", {
          variant: "error",
        });
      }
    } else {
      openUnAuthenticatedModal(true);
    }
  };

  return (
    <Wrapper>
      {/* PRODUCT FAVORITE BUTTON */}
      <FavoriteButton
        isFavorite={
          wishListProductIds && wishListProductIds.includes(product.id)
        }
        toggleFavorite={toggleFavorite}
      />

      <Grid container spacing={1}>
        <Grid item sm={3} xs={12}>
          <Box position="relative">
            {/* DISCOUNT PERCENT CHIP IF AVAILABLE */}
            <DiscountChip discount={100} />

            {/* PRODUCT IMAGE / THUMBNAIL */}
            <Image src={imgUrl} alt={name} width="100%" />
          </Box>
        </Grid>

        <Grid item sm={9} xs={12}>
          <FlexBox
            flexDirection="column"
            justifyContent="center"
            height="100%"
            p={2}
          >
            {/* PRODUCT TITLE / NAME */}
            <Link href={`/products/${id}`}>
              <H5 fontWeight="600" my="0.5rem">
                {name}
              </H5>
            </Link>

            {/* PRODUCT RATING / REVIEW  */}
            {/* <Rating size="small" value={rating} color="warn" readOnly /> */}

            {/* PRODUCT PRICE */}
            <ProductPrice price={price} discount={50} />

            {/* PRODUCT ADD TO CART BUTTON */}
            <LoadingButton
              fullWidth
              color="dark"
              variant="outlined"
              onClick={() => handleAddToCart(product, 1)}
              loading={selectedProductId === product?.id && isLoading}
              disabled={isOutOfStock || cartUnits >= product?.units}
            >
              {isOutOfStock ? "Out of stock" : "Add To Cart"}
            </LoadingButton>
          </FlexBox>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default ProductCard9;
function openUnAuthenticatedModal(arg0: boolean) {
  throw new Error("Function not implemented.");
}
