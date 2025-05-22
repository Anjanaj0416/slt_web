"use client";

import { Fragment } from "react";
import Grid from "@mui/material/Grid";
import Favorite from "@mui/icons-material/Favorite";
// LOCAL CUSTOM HOOK
import useWishList from "./use-wish-list";
// GLOBAL CUSTOM COMPONENT
import ProductCard11 from "components/product-cards/product-card-11";
// Local CUSTOM COMPONENT
import Pagination from "../pagination";
import DashboardHeader from "../dashboard-header";
import { useSession } from "next-auth/react";
import { User1, UserWishlist } from "models/User.model";
import Box from "@mui/material/Box";

// ==================================================================
type Props = { wishlist: UserWishlist };
// ==================================================================

const WishListPageView = (props: Props) => {
  const { data } = useSession();
  //
  const user = data?.user as User1;
  const { wishlist } = props;
  const {
    currentPage,
    handleChangePage,
    filteredWishlist,
    handleFavorite,
    isUpdating,
  } = useWishList(wishlist, user?.id);

  return (
    <Fragment>
      {/* TOP HEADER AREA */}
      <DashboardHeader title="My Wish List" Icon={Favorite} />

      {/* PRODUCT LIST AREA */}
      <Grid container spacing={3}>
        {filteredWishlist?.products?.length > 0 ? (
          filteredWishlist.products
            .slice((currentPage - 1) * 6, (currentPage - 1) * 6 + 6)
            .map((item) => (
              <Grid item lg={4} sm={6} xs={12} key={item.id}>
                <ProductCard11
                  handleFavorite={handleFavorite}
                  product={item}
                  rating={5}
                  isUpdating={isUpdating}
                />
              </Grid>
            ))
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "200px",
              fontWeight:"semibold",
              fontSize: "18px",
            }}
          >
            There is no wishlist items !
          </Box>
        )}
      </Grid>

      {/* PAGINATION AREA */}
      {!!filteredWishlist.products.length && (
        <Pagination
          page={currentPage}
          count={Math.ceil(filteredWishlist.products.length / 6)}
          onChange={(_, page) => handleChangePage(page)}
        />
      )}
    </Fragment>
  );
};

export default WishListPageView;
