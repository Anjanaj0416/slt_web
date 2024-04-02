"use client";

import { Fragment } from "react";
import Grid from "@mui/material/Grid";
import Favorite from "@mui/icons-material/Favorite";
// LOCAL CUSTOM HOOK
import useWishList from "./use-wish-list";
// GLOBAL CUSTOM COMPONENT
import ProductCard1 from "components/product-cards/product-card-1";
// Local CUSTOM COMPONENT
import Pagination from "../pagination";
import DashboardHeader from "../dashboard-header";
import { useSession } from "next-auth/react";
import { User1, UserWishlist } from "models/User.model";

// ==================================================================
type Props = { totalProducts: number; wishlist: UserWishlist };
// ==================================================================

const WishListPageView = (props: Props) => {
  const { data } = useSession();
  //
  const user = data?.user as User1;
  const { totalProducts, wishlist } = props;
  const { currentPage, handleChangePage, filteredWishlist, handleFavorite, isUpdating } =
    useWishList(wishlist, user?.id);

  return (
    <Fragment>
      {/* TOP HEADER AREA */}
      <DashboardHeader title="My Wish List" Icon={Favorite} />

      {/* PRODUCT LIST AREA */}
      <Grid container spacing={3}>
        {filteredWishlist.products.map((item) => (
          <Grid item lg={4} sm={6} xs={12} key={item.id}>
            <ProductCard1
              handleFavorite={handleFavorite}
              product={item}
              rating={5}
              isUpdating={isUpdating}
            />
          </Grid>
        ))}
      </Grid>

      {/* PAGINATION AREA */}
      {/* <Pagination
        page={currentPage}
        count={Math.ceil(totalProducts / 6)}
        onChange={(_, page) => handleChangePage(page)}
      /> */}
    </Fragment>
  );
};

export default WishListPageView;
