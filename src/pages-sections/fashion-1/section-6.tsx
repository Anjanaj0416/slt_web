"use client";

import { FC } from "react";
import Grid from "@mui/material/Grid";
// GLOBAL CUSTOM COMPONENTS
import CategorySectionCreator from "components/CategorySectionCreator";
import ProductCard12 from "components/product-cards/ProductCard12";
import ProductCard3 from "components/product-cards/ProductCard3";
// CUSTOM DATA MODEL
import Product from "models/Product.model";

// =============================================================
type Props = { products: Product[] };
// =============================================================

const Section6: FC<Props> = ({ products }) => {
  // GET THE FIRST PRODUCT
  const { title, slug, id, price, discount, rating, thumbnail } = products[0] || {};

  // REMAINING TRENDING PRODUCTS
  const TRENDING_ITEMS = products.slice(1, products.length);

  return (
    <CategorySectionCreator title="Trending Items">
      <Grid container spacing={4}>
        <Grid item md={3} xs={12}>
          <ProductCard12
            id={title}
            slug={slug}
            title={title}
            price={price}
            off={discount}
            rating={rating}
            imgUrl={thumbnail}
          />
        </Grid>

        <Grid item container md={9} xs={12} spacing={4}>
          {TRENDING_ITEMS.map((item) => (
            <Grid item xs={6} sm={4} key={item.id}>
              <ProductCard3
                slug={item.slug}
                title={item.title}
                price={item.price}
                off={item.discount}
                rating={item.rating}
                imgUrl={item.thumbnail}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </CategorySectionCreator>
  );
};

export default Section6;
