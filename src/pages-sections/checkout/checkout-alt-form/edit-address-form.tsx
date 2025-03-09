import { FC, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import { useFormik } from "formik";
import * as yup from "yup";
// GLOBAL CUSTOM COMPONENT
import { H5 } from "components/Typography";
import CloseIcon from "@mui/icons-material/Close";

import { POSTAddressResponse } from "models/Address.model";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useUpdateAddressMutation } from "services/address-api";
import { useSnackbar } from "notistack";
import { useSession } from "next-auth/react";
import { User1 } from "models/User.model";
import { LoadingButton } from "@mui/lab";
import { getCities } from "data/city-list";
import { DISTRICTS } from "data/district-list";

const validationSchema = yup.object({
  name: yup.string().required("required"),
  addressLine1: yup.string().required("required"),
  addressLine2: yup.string().required("required"),
  postalCode: yup.number().required("required"),
  provinceOrState: yup.string().required("required"),
  contactNumber: yup.string().required("required"),
  primary: yup.boolean(),
});

// ================================================================
interface Props {
  active: boolean;
  address: POSTAddressResponse;
  setEditAddressId: Function;
  handleFetch: Function;
}
// ================================================================

const EditAddressForm: FC<Props> = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const { data: session } = useSession();
  const user = session?.user as User1;
  //
  const [updateAddress, { isLoading: isUpdating, isSuccess }] =
    useUpdateAddressMutation();
  const { active, address, setEditAddressId, handleFetch } = props;

  const [openModal, setOpenModal] = useState(active);

  const handleCloseModal = () => {
    setEditAddressId("");
    setOpenModal(false);
  };

  useEffect(() => {
    if (isSuccess && !isUpdating) {
      handleCloseModal();
      enqueueSnackbar("Address successfully updated", { variant: "success" });
    }
  }, [isUpdating]);

  const initialValues = {
    name: address?.name,
    addressLine1: address?.addressLine1,
    addressLine2: address?.addressLine2,
    postalCode: address?.postalCode,
    provinceOrState: address?.provinceOrState,
    contactNumber: address?.contactNumber,
    primary: address?.primary,
    city: address?.city,
    addressType: address?.addressType,
  };

  const { values, touched, errors, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      await updateAddress({
        userId: user?.id,
        addressId: address?.id,
        body: values,
      });
      handleFetch();
      resetForm({});
    },
  });

  return (
    <Dialog open={openModal} onClose={handleCloseModal}>
      <DialogContent>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"flex-start"}
        >
          <H5 mb={4}>Edit Address Information</H5>
          <IconButton
            size="small"
            aria-label="close"
            onClick={handleCloseModal}
            sx={{ border: "1px solid black", width: 22, height: 22 }}
          >
            <CloseIcon sx={{ width: 16, height: 16 }} />
          </IconButton>
        </Box>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth
                type="text"
                name="name"
                value={values.name}
                label="Enter Your Name"
                onChange={handleChange}
                helperText={touched.name && errors.name}
                error={touched.name && Boolean(errors.name)}
              />
            </Grid>

            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth
                type="text"
                name="addressLine1"
                label="Address line 1"
                value={values.addressLine1}
                onChange={handleChange}
                helperText={touched.addressLine1 && errors.addressLine1}
                error={touched.addressLine1 && Boolean(errors.addressLine1)}
              />
            </Grid>

            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth
                type="text"
                name="addressLine2"
                label="Address line 2"
                value={values.addressLine2}
                onChange={handleChange}
                helperText={touched.addressLine2 && errors.addressLine2}
                error={touched.addressLine2 && Boolean(errors.addressLine2)}
              />
            </Grid>

            <Grid item sm={6} xs={12}>
              <FormControl
                fullWidth
                size="small"
                error={
                  touched.provinceOrState && Boolean(errors.provinceOrState)
                }
              >
                <InputLabel>District</InputLabel>
                <Select
                  size="small"
                  name="provinceOrState"
                  label="District"
                  value={values.provinceOrState}
                  onChange={handleChange}
                >
                  {DISTRICTS.map((district) => (
                    <MenuItem key={district} value={district}>
                      {district}
                    </MenuItem>
                  ))}
                </Select>
                {touched.provinceOrState && errors.provinceOrState && (
                  <FormHelperText>{errors.provinceOrState}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item sm={6} xs={12}>
              <FormControl
                fullWidth
                size="small"
                error={touched.city && Boolean(errors.city)}
              >
                <InputLabel>City</InputLabel>
                <Select
                  size="small"
                  name="city"
                  label="City"
                  value={values.city}
                  onChange={handleChange}
                >
                  {values.provinceOrState &&
                    getCities(values.provinceOrState)?.map((city) => (
                      <MenuItem key={city} value={city}>
                        {city}
                      </MenuItem>
                    ))}
                </Select>
                {touched.city && errors.city && (
                  <FormHelperText>{errors.city}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth
                name="postalCode"
                label="Postal Code"
                type="number"
                value={values.postalCode}
                onChange={handleChange}
                helperText={touched.postalCode && errors.postalCode}
                error={touched.postalCode && Boolean(errors.postalCode)}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth
                type="text"
                name="contactNumber"
                value={values.contactNumber}
                onChange={handleChange}
                label="Enter Your Phone"
                helperText={touched.contactNumber && errors.contactNumber}
                error={touched.contactNumber && Boolean(errors.contactNumber)}
              />
            </Grid>
            <Grid item sm={12} xs={12}>
              <FormControlLabel
                label="Is Primary"
                control={
                  <Checkbox
                    name="primary"
                    checked={values.primary}
                    size="small"
                  />
                }
                onChange={handleChange}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <LoadingButton
                loading={isUpdating}
                color="primary"
                variant="contained"
                type="submit"
              >
                Update
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};
//
export default EditAddressForm;
