"use client";

import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Container,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useCreateComplainMutation } from "services/complain-api";
import { LoadingButton } from "@mui/lab";
import { enqueueSnackbar } from "notistack";

// Validation schema using Yup
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string().matches(
    /^(?:\+94\d{9}|0\d{9})$/,
    "Enter valid telephone number"
  ),
  description: Yup.string().required("Description is required").max(225).min(8),
});

const ContactUsPageView: React.FC = () => {
  const [createComplain, { isLoading: isCreating, isSuccess }] =
    useCreateComplainMutation();
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    description: "",
  };
  console.log(isCreating);

  const {
    handleChange,
    resetForm,
    handleSubmit,
    handleBlur,
    errors,
    touched,
    values,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => submitData(values),
  });

  useEffect(() => {
    if (isSuccess && !isCreating) {
      enqueueSnackbar("Your message successfully submitted", {
        variant: "success",
      });
      resetForm();
    }
  }, [isCreating]);

  const submitData = (values: typeof initialValues) => {
    createComplain({ body: { ...values } });
  };

  return (
    <Box display={"flex"} justifyContent={"space-between"}>
      <Box width={"45%"} pt={6} pl={12}>
        <Typography variant="h4" gutterBottom>
          Contact Us
        </Typography>
        <Box display="flex" alignItems="center" mb={2} mt={3}>
          <LocationOnIcon color="primary" />
          <Typography variant="body1" sx={{ ml: 1 }}>
            No.148/15, Lesley Ranagala Mawatha, Baseline Road, Colombo 08, Sri
            Lanka
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" mb={2}>
          <EmailIcon color="primary" />
          <Typography variant="body1" sx={{ ml: 1 }}>
            info@marcketplacer.com
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" mb={2}>
          <PhoneIcon color="primary" />
          <Typography variant="body1" sx={{ ml: 1 }}>
            +1 234 567 890
          </Typography>
        </Box>
        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            Follow Us
          </Typography>

          <IconButton
            href="https://www.facebook.com"
            target="_blank"
            color="primary"
            aria-label="Facebook"
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            href="https://www.twitter.com"
            target="_blank"
            color="primary"
            aria-label="Twitter"
          >
            <TwitterIcon />
          </IconButton>
        </Box>
      </Box>
      <Container maxWidth="sm" sx={{ marginBottom: 4 }}>
        <Box sx={{ mt: 4 }}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              margin="normal"
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              margin="normal"
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
            <TextField
              label="Phone"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              margin="normal"
              error={touched.phone && Boolean(errors.phone)}
              helperText={touched.phone && errors.phone}
            />
            <TextField
              label="Description"
              name="description"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              multiline
              rows={6}
              fullWidth
              margin="normal"
              error={touched.description && Boolean(errors.description)}
              helperText={touched.description && errors.description}
            />
            <LoadingButton
              loading={isCreating}
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              disabled={isCreating}
            >
              Submit
            </LoadingButton>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default ContactUsPageView;
