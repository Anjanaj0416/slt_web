"use client";

import { FC, useContext } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
// GLOBAL CUSTOM COMPONENTS
import { H3 } from "components/Typography";
// CUSTOM DATA MODEL
import { Product1 } from "models/Product.model";
import ProductCard11 from "components/product-cards/product-card-11";
import { WishlistContext } from "contexts/WishlistContext";
import useWishList from "pages-sections/customer-dashboard/wish-list/use-wish-list";
import { User1 } from "models/User.model";
import { useSession } from "next-auth/react";

// ==============================================================
type Props = { products: Product1[] };
// ==============================================================

const RelatedProducts: FC<Props> = ({ products }) => {
  const { data } = useSession();
  //
  const user = data?.user as User1;
  const { wishlist } = useContext(WishlistContext);
  const { handleFavorite, isUpdating } = useWishList(wishlist, user?.id);
  const wishlistIds = wishlist.products.map((product) => product.id);
  return (
    <Box mb={7.5}>
      <H3 mb={3}>Related Products</H3>

      <Grid container spacing={3}>
        {products.map((item, ind) => (
          <Grid item lg={3} md={4} sm={6} xs={12} key={ind}>
            <ProductCard11
              hoverEffect
              product={item}
              isUpdating={isUpdating}
              isFavorite={wishlistIds.includes(item.id)}
              handleFavorite={handleFavorite}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RelatedProducts;
