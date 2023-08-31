import { FC } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
// GLOBAL CUSTOM COMPONENTS
import { Paragraph } from "components/Typography";
import { FlexRowCenter } from "components/flex-box";
import { ProductCard5 } from "components/product-cards/product-card-5";
import CategorySectionCreator from "components/CategorySectionCreator";
// CUSTOM DATA MODEL
import Product from "models/Product.model";

// STYLED COMPONENT
const SubTitle = styled(Paragraph)(({ theme }) => ({
  fontSize: 12,
  marginTop: "-20px",
  marginBottom: "20px",
  color: theme.palette.grey[600],
}));

// ===========================================================
type Props = { products: Product[] };
// ===========================================================

const Section4: FC<Props> = ({ products }) => {
  return (
    <CategorySectionCreator title="All Products" seeMoreLink="#" mb={0}>
      <SubTitle>Best deal with medical and beauty items</SubTitle>
      <Grid container mb={-0.5} spacing={3}>
        {products.map((item) => (
          <Grid key={item.id} item md={4} sm={6} xs={12}>
            <ProductCard5
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
        <Button color="primary" variant="contained">
          Load More...
        </Button>
      </FlexRowCenter>
    </CategorySectionCreator>
  );
};

export default Section4;
