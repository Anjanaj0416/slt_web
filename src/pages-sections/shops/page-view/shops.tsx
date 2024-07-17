"use client";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Pagination from "@mui/material/Pagination";
// Local CUSTOM COMPONENT
import ShopCard from "../shop-card";
// GLOBAL CUSTOM COMPONENTS
import { H2, Span } from "components/Typography";
import { FlexBetween } from "components/flex-box";
// CUSTOM DATA MODEL
import Store from "models/Store.model";
import useListStores from "./use-list-stores";

// =============================================
type Props = { storesData: Page<Store> };
// =============================================
const PAGE_SIZE = 9;
const ShopsPageView = ({ storesData }: Props) => {
  const { data: stores, totalPages, totalResults } = storesData;
  const { setPage, storeList, page, isLoading } = useListStores(
    stores,
    totalPages,
    PAGE_SIZE
  );
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
  };
  const resultMinRange = page * PAGE_SIZE + page;
  const resultMaxRange = (page + 1) * PAGE_SIZE + page;

  return (
    <Container sx={{ mt: 4, mb: 6 }}>
      <H2 mb={3}>All Shops</H2>

      {/* ALL SHOP LIST AREA */}
      {!isLoading && (
        <Grid container spacing={3}>
          {storeList.map((item) => (
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
      )}

      {/* PAGINATION AREA */}
      <FlexBetween flexWrap="wrap" mt={4}>
        <Span color="grey.600">
          {totalResults === resultMinRange
            ? `Showing ${totalResults} of ${totalResults} Shops`
            : `Showing ${page ? resultMinRange : 1}-${
                resultMaxRange > totalResults ? totalResults : resultMaxRange
              } of ${totalResults} Shops`}
        </Span>
        <Pagination
          count={totalPages}
          onChange={handleChange}
          variant="outlined"
          color="primary"
        />
      </FlexBetween>
    </Container>
  );
};

export default ShopsPageView;
