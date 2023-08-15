"use client";

import { FC } from "react";
import Grid from "@mui/material/Grid";
// CUSTOM ICON COMPONENT
import NewArrival from "icons/NewArrival";
// GLOBAL CUSTOM COMPONENTS
import BazaarCard from "components/BazaarCard";
import ProductCard2 from "components/product-cards/ProductCard2";
import CategorySectionCreator from "components/CategorySectionCreator";
// CUSTOM DATA MODEL
import Product from "models/Product.model";

// =======================================================
type Props = { newArrivalsList: Product[] };
// =======================================================

const Section5: FC<Props> = ({ newArrivalsList }) => {
  return (
    <CategorySectionCreator icon={<NewArrival />} title="New Arrivals" seeMoreLink="#">
      <BazaarCard sx={{ p: 2 }}>
        <Grid container spacing={3}>
          {newArrivalsList.map(({ id, title, price, thumbnail, slug }) => (
            <Grid item lg={2} md={3} sm={4} xs={6} key={id}>
              <ProductCard2 thumbnail={thumbnail} title={title} price={price} slug={slug} />
            </Grid>
          ))}
        </Grid>
      </BazaarCard>
    </CategorySectionCreator>
  );
};

export default Section5;
