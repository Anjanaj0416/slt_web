import { FC } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
// GLOBAL CUSTOM COMPONENTS
import { Paragraph } from "components/Typography";
import { FlexRowCenter } from "components/flex-box";
import { SectionHeader } from "components/section-header";
import { ProductCard4 } from "components/product-cards/product-card-4";
// CUSTOM DATA MODEL
import Product from "models/Product.model";

// STYLED COMPONENT
const SubTitle = styled(Paragraph)(({ theme }) => ({
  fontSize: 12,
  marginTop: "-20px",
  marginBottom: "20px",
  color: theme.palette.grey[600],
}));

// ========================================================
type Props = { products: Product[]; title?: string };
// ========================================================

const AllProducts: FC<Props> = ({ products, title = "All Products" }) => {
  return (
    <Box>
      <SectionHeader title={title} seeMoreLink="#" />
      <SubTitle>Best collection in 2021 for you!</SubTitle>

      <Grid container spacing={3}>
        {products.map((item) => (
          <Grid key={item.id} item md={4} sm={6} xs={12}>
            <ProductCard4
              id={item.id}
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

      <FlexRowCenter mt={6}>
        <Button variant="contained" color="primary" sx={{ fontSize: 13 }}>
          Load More...
        </Button>
      </FlexRowCenter>
    </Box>
  );
};

export default AllProducts;
