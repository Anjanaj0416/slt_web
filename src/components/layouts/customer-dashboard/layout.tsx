import { FC, PropsWithChildren } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
// Local CUSTOM COMPONENTS
import Navigation from "./navigation";
import { auth } from "utils/auth";
import request from "utils/request";
import API from "constants/orders";
import { Box } from "@mui/material";

/**
 *  Used in:
 *  1. wish-list page
 *  2. address and address-details page
 *  3. orders and order-details page
 *  4. payment-methods and payment-method-details page
 *  5. profile and edit profile page
 *  6. support-tickets page
 */

const CustomerDashboardLayout: FC<PropsWithChildren> = async ({ children }) => {
  const { user } = await auth();
  //
  const orders = await request(API.GET_USER_ORDERS, {
    userId: user?.id,
    query: "size=1",
  });

  return (
    <Box sx={{ my: 4, px: { xs: 2, md: 16 } }}>
      <Grid container spacing={3}>
        <Grid
          item
          lg={3}
          xs={12}
          sx={{ display: { xs: "none", sm: "none", md: "block" } }}
        >
          <Navigation ordersCount={orders?.totalResults} />
        </Grid>

        <Grid item lg={9} xs={12}>
          {children}
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomerDashboardLayout;
