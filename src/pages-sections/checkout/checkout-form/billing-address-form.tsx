import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { FC } from "react";
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
  sameAsShipping: boolean;
  handleCheckboxChange: (checked: boolean) => void;
}
// ==============================================================

const BillingAddressForm: FC<Props> = ({
  errors,
  handleBlur,
  handleChange,
  touched,
  values,
  sameAsShipping,
  handleCheckboxChange,
}) => {
  return (
    <Card sx={{ mb: 4, p: 3 }}>
      <H6 mb={2}>Billing Address</H6>

      <FormControlLabel
        label="Same as shipping address"
        control={
          <Checkbox
            size="small"
            color="secondary"
            onChange={(e) => handleCheckboxChange(e.target.checked)}
          />
        }
        sx={{
          zIndex: 1,
          position: "relative",
          mb: sameAsShipping ? "" : "1rem",
        }}
      />

      {!sameAsShipping && (
        <Grid container spacing={6}>
          <Grid item sm={6} xs={12}>
            <TextField
              fullWidth
              sx={{ mb: 2 }}
              label="Full Name"
              name="billing_name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.billing_name}
              error={!!touched.billing_name && !!errors.billing_name}
              helperText={
                (touched.billing_name && errors.billing_name) as string
              }
            />

            <TextField
              fullWidth
              sx={{ mb: 2 }}
              onBlur={handleBlur}
              label="Phone Number"
              name="billing_contact"
              onChange={handleChange}
              value={values.billing_contact}
              error={!!touched.billing_contact && !!errors.billing_contact}
              helperText={
                (touched.billing_contact && errors.billing_contact) as string
              }
            />

            <TextField
              fullWidth
              type="number"
              sx={{ mb: 2 }}
              label="Zip Code"
              name="billing_zip"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.billing_zip}
              error={!!touched.billing_zip && !!errors.billing_zip}
              helperText={(touched.billing_zip && errors.billing_zip) as string}
            />

            <TextField
              fullWidth
              label="Address Line 1"
              onBlur={handleBlur}
              onChange={handleChange}
              name="billing_address_line1"
              value={values.billing_address_line1}
              error={
                !!touched.billing_address_line1 &&
                !!errors.billing_address_line1
              }
              helperText={
                (touched.billing_address_line1 &&
                  errors.billing_address_line1) as string
              }
            />
          </Grid>

          <Grid item sm={6} xs={12}>
            <TextField
              fullWidth
              label="Address Line 2"
              onBlur={handleBlur}
              name="billing_address_line2"
              onChange={handleChange}
              value={values.billing_address_line2}
              error={
                !!touched.billing_address_line2 &&
                !!errors.billing_address_line2
              }
              helperText={
                (touched.billing_address_line2 &&
                  errors.billing_address_line2) as string
              }
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Province/State"
              onBlur={handleBlur}
              name="billing_province_or_state"
              onChange={handleChange}
              value={values.billing_province_or_state}
              error={
                !!touched.billing_province_or_state &&
                !!errors.billing_province_or_state
              }
              helperText={
                (touched.billing_province_or_state &&
                  errors.billing_province_or_state) as string
              }
            />
          </Grid>
        </Grid>
      )}
    </Card>
  );
};

export default BillingAddressForm;
