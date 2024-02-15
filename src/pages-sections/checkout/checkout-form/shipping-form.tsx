import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { FC } from "react";
// GLOBAL CUSTOM COMPONENT
import { H6 } from "components/Typography";
// DUMMY CUSTOM DATA

// ==============================================================
interface Props {
  handleBlur: any;
  handleChange: any;
  values: any;
  touched: any;
  errors: any;
  setFieldValue: any;
}
// ==============================================================

const ShippingForm: FC<Props> = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
}) => {
  return (
    <Card sx={{ mb: 4, p: 3 }}>
      <H6 mb={2}>Shipping Address</H6>

      <Grid container spacing={6}>
        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            label="Full Name"
            onBlur={handleBlur}
            name="shipping_name"
            onChange={handleChange}
            value={values.shipping_name}
            error={!!touched.shipping_name && !!errors.shipping_name}
            helperText={
              (touched.shipping_name && errors.shipping_name) as string
            }
            disabled
            sx={{
              mb: 2,
            }}
          />

          <TextField
            fullWidth
            sx={{ mb: 2 }}
            onBlur={handleBlur}
            label="Phone Number"
            onChange={handleChange}
            name="shipping_contact"
            value={values.shipping_contact}
            error={!!touched.shipping_contact && !!errors.shipping_contact}
            helperText={
              (touched.shipping_contact && errors.shipping_contact) as string
            }
            disabled
          />

          <TextField
            fullWidth
            type="number"
            sx={{ mb: 2 }}
            label="Zip Code"
            name="shipping_zip"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.shipping_zip}
            error={!!touched.shipping_zip && !!errors.shipping_zip}
            helperText={(touched.shipping_zip && errors.shipping_zip) as string}
            disabled
          />

          <TextField
            fullWidth
            label="Address Line 1"
            onBlur={handleBlur}
            onChange={handleChange}
            name="billing_address_line1"
            value={values.billing_address_line1}
            error={
              !!touched.billing_address_line1 && !!errors.billing_address_line1
            }
            helperText={
              (touched.billing_address_line1 &&
                errors.billing_address_line1) as string
            }
            disabled
          />
        </Grid>

        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            label="Address Line 2"
            onBlur={handleBlur}
            onChange={handleChange}
            name="billing_address_line2"
            value={values.billing_address_line2}
            error={
              !!touched.billing_address_line2 && !!errors.billing_address_line2
            }
            helperText={
              (touched.billing_address_line2 &&
                errors.billing_address_line2) as string
            }
            disabled
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Province/State"
            onBlur={handleBlur}
            name="shipping_province_or_state"
            onChange={handleChange}
            value={values.shipping_province_or_state}
            error={
              !!touched.shipping_province_or_state &&
              !!errors.shipping_province_or_state
            }
            helperText={
              (touched.shipping_province_or_state &&
                errors.shipping_province_or_state) as string
            }
            disabled
          />
        </Grid>
      </Grid>
    </Card>
  );
};

export default ShippingForm;
