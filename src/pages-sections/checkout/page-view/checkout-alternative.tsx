import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
// Local CUSTOM COMPONENTS
import CheckoutForm2 from "../checkout-form-2";
import CheckoutSummary2 from "../checkout-summery-2";

const CheckoutAlternativePageView = () => {
  return (
    <Container sx={{ my: "1.5rem" }}>
      <Grid container spacing={3}>
        <Grid item lg={8} md={8} xs={12}>
          <CheckoutForm2 />
        </Grid>

        <Grid item lg={4} md={4} xs={12}>
          <CheckoutSummary2 />
        </Grid>
      </Grid>
    </Container>
  );
};

export default CheckoutAlternativePageView;
