import { FC, Fragment, useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import { useFormik } from "formik";
import * as yup from "yup";
// LOCAL CUSTOM COMPONENT
import { H5 } from "components/Typography";
import CloseIcon from "@mui/icons-material/Close";
// CUSTOM DATA MODEL
import { Address } from "./_types";
import { Box, Checkbox, FormControlLabel, IconButton } from "@mui/material";
import { usePostAddressMutation } from "services/address-api";
import { useSession } from "next-auth/react";
import { User1 } from "models/User.model";
import { useSnackbar } from "notistack";

const validationSchema = yup.object({
  name: yup.string().required("required"),
  addressLine1: yup.string().required("required"),
  addressLine2: yup.string().required("required"),
  postalCode: yup.number().required("required"),
  provinceOrState: yup.string().required("required"),
  contactNumber: yup.string().required("required"),
  primary: yup.boolean(),
});

// ==================================================================
interface Props {
  addressType: string;
  handleFetch: Function;
}
// ==================================================================

const NewAddressForm: FC<Props> = ({ addressType, handleFetch }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { data: session } = useSession();
  const user = session?.user as User1;
  //
  const [createAddress, { isLoading }] = usePostAddressMutation();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleCloseModal = () => setOpenModal(false);

  const initialValues = {
    name: "",
    addressLine1: "",
    addressLine2: "",
    postalCode: "",
    provinceOrState: "",
    contactNumber: "",
    primary: false,
    addressType,
  };

  const { handleChange, handleSubmit, errors, touched, values } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      await createAddress({ body: values, userId: user?.id });
      handleFetch();
      enqueueSnackbar("Address successfully created", { variant: "success" });
      handleCloseModal();
      resetForm({});
    },
  });

  return (
    <Fragment>
      <Button
        color="primary"
        variant="outlined"
        onClick={() => setOpenModal(true)}
      >
        Add New Address
      </Button>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogContent>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"flex-start"}
          >
            <H5 mb={4}>Add New Address Information</H5>
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
                <TextField
                  fullWidth
                  name="provinceOrState"
                  label="Province or State"
                  value={values.provinceOrState}
                  onChange={handleChange}
                  helperText={touched.provinceOrState && errors.provinceOrState}
                  error={
                    touched.provinceOrState && Boolean(errors.provinceOrState)
                  }
                />
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
                <Button color="primary" variant="contained" type="submit">
                  Save
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};
//
export default NewAddressForm;
