import { FC } from "react";
import { Button, Dialog, DialogContent, Grid, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  address2: yup.string(),
  name: yup.string().required("required"),
  address1: yup.string().required("required"),
  phone: yup.number().required("required"),
});

// ================================================================
interface Props {
  selected: any;
  addressData: any[];
  openEditForm: boolean;
  setAddressData: (value: any[]) => void;
  setOpenEditForm: (value: boolean) => void;
}
// ================================================================

const EditAddressForm: FC<Props> = (props) => {
  const { addressData, selected, setAddressData, openEditForm, setOpenEditForm } = props;

  const initialValues = {
    name: selected.name,
    phone: selected.phone,
    address1: selected.address1,
    address2: selected.address2,
  };

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const updated = addressData.map((item) => {
        return item.name === selected.name ? values : item;
      });

      setAddressData(updated);
      if (updated) return setOpenEditForm(false);
    },
  });

  return (
    <Dialog open={openEditForm} onClose={() => setOpenEditForm(false)}>
      <DialogContent>
        <Typography variant="h6" mb={3}>
          Edit Address Information
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth
                name="name"
                type="text"
                label="Enter Your Name"
                value={values.name}
                onBlur={handleBlur}
                onChange={handleChange}
                helperText={(touched.name && errors.name) as string}
                error={touched.name && Boolean(errors.name)}
              />
            </Grid>

            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth
                type="text"
                name="address1"
                label="Address line 1"
                value={values.address1}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.address1 && Boolean(errors.address1)}
                helperText={(touched.address1 && errors.address1) as string}
              />
            </Grid>

            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth
                type="text"
                name="address2"
                label="Address line 2"
                value={values.address2}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.address2 && Boolean(errors.address2)}
                helperText={(touched.address2 && errors.address2) as string}
              />
            </Grid>

            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth
                type="text"
                name="phone"
                label="Enter Your Phone"
                value={values.phone}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.phone && Boolean(errors.phone)}
                helperText={(touched.phone && errors.phone) as string}
              />
            </Grid>

            <Grid item sm={6} xs={12}>
              <Button color="primary" variant="contained" type="submit">
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditAddressForm;
