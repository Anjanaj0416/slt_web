import { FC, Fragment, useEffect, useState } from "react";
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
import {
  Autocomplete,
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
import { usePostAddressMutation } from "services/address-api";
import { useSession } from "next-auth/react";
import { User1 } from "models/User.model";
import { useSnackbar } from "notistack";
import { LoadingButton } from "@mui/lab";
import { DISTRICTS } from "data/district-list";
import { CITIES_DATA } from "data/city-list";

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
  addressesCount: number;
}
// ==================================================================

const NewAddressForm: FC<Props> = ({
  addressType,
  handleFetch,
  addressesCount,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const { data: session } = useSession();
  const user = session?.user as User1;
  //
  const [createAddress, { isLoading: isCreating, isSuccess }] =
    usePostAddressMutation();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleCloseModal = () => setOpenModal(false);

  useEffect(() => {
    if (isSuccess && !isCreating) {
      handleCloseModal();
      enqueueSnackbar("Address successfully created", { variant: "success" });
    }
  }, [isCreating]);

  const initialValues = {
    name: "",
    addressLine1: "",
    addressLine2: "",
    postalCode: "",
    provinceOrState: "",
    city: "",
    contactNumber: "",
    primary: false,
    addressType,
  };

  const {
    handleChange,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    errors,
    touched,
    values,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log(values);

      await createAddress({ body: values, userId: user?.id });
      handleFetch();
      resetForm({});
    },
  });

  const handleOpenModal = () => {
    if (addressesCount > 9) {
      enqueueSnackbar("The maximum address count should be 10 or less!", {
        variant: "warning",
      });
      return;
    }
    setOpenModal(true);
  };

  return (
    <Fragment>
      <Button color="primary" variant="outlined" onClick={handleOpenModal}>
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
              <Grid item sm={12} xs={12}>
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
                  <Autocomplete
                    size="small"
                    options={DISTRICTS} // array of strings
                    value={values.provinceOrState || null}
                    onChange={(_, newValue) => {
                      setFieldValue("provinceOrState", newValue ?? "");
                      setFieldValue("city", "");
                    }}
                    onBlur={() => setFieldTouched("provinceOrState", true)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="District"
                        name="provinceOrState"
                        error={
                          touched.provinceOrState &&
                          Boolean(errors.provinceOrState)
                        }
                        helperText={
                          touched.provinceOrState && errors.provinceOrState
                        }
                        size="small"
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item sm={6} xs={12}>
                <FormControl
                  fullWidth
                  size="small"
                  error={touched.city && Boolean(errors.city)}
                >
                  <Autocomplete
                    size="small"
                    options={
                      values?.provinceOrState
                        ? CITIES_DATA[values?.provinceOrState.toLowerCase()]
                        : null
                    }
                    value={values.city || null}
                    disabled={!values?.provinceOrState || !CITIES_DATA}
                    onChange={(_, newValue) => {
                      setFieldValue("city", newValue ?? "");
                    }}
                    onBlur={() => setFieldTouched("city", true)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="City"
                        name="city"
                        error={Boolean(touched.city && errors.city)}
                        helperText={
                          touched.city && errors.city ? errors.city : ""
                        }
                        size="small"
                      />
                    )}
                  />
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
                  label="Default"
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
                  loading={isCreating}
                  color="primary"
                  variant="contained"
                  type="submit"
                >
                  Save
                </LoadingButton>
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
