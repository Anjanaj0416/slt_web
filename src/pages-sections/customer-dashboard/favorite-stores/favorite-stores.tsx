"use client";

import { Fragment } from "react";
import Grid from "@mui/material/Grid";
import StoreIcon from "@mui/icons-material/Store";
// LOCAL CUSTOM HOOK
import useFavoriteStore from "./use-favorite-stores";
// Local CUSTOM COMPONENT
import Pagination from "../pagination";
import DashboardHeader from "../dashboard-header";
import Store from "models/Store.model";
import ShopCard from "pages-sections/shops/shop-card";

// ==================================================================
type Props = { favoriteStores: Store[] };
// ==================================================================

const FavoriteStoresPageView = ({ favoriteStores }: Props) => {
  const { filteredFavStores, currentPage, handleChangePage } =
    useFavoriteStore(favoriteStores);

  return (
    <Fragment>
      {/* TOP HEADER AREA */}
      <DashboardHeader title="Favorite Stores" Icon={StoreIcon} />

      {/* PRODUCT LIST AREA */}
      <Grid container spacing={3}>
        {filteredFavStores.map((item) => (
          <Grid item lg={4} sm={6} xs={12} key={item.id}>
            <ShopCard
              name={item.name}
              id={item.id}
              telephone={item.telephone}
              address={item.address}
              logoFilePath={item.logoFilePath}
            />
          </Grid>
        ))}
      </Grid>

      {/* PAGINATION AREA */}
      {!!favoriteStores.length && (
        <Pagination
          page={currentPage}
          count={Math.ceil(favoriteStores.length / 6)}
          onChange={(_, page) => handleChangePage(page)}
        />
      )}
    </Fragment>
  );
};

export default FavoriteStoresPageView;
