"use client";

import Link from "next/link";
import { Fragment } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import addDays from "date-fns/addDays";
import parseISO from "date-fns/parseISO";
import { CameraEnhance, Person } from "@mui/icons-material";
import { Avatar, Box, Button, Grid, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Card1 from "components/Card1";
import { FlexBox } from "components/flex-box";
import { Navigation } from "components/layouts/customer-dashboard-layout";

import DashboardHeader from "../../dashboard-header";
import User from "models/User.model";

// ===========================================================
type Props = { user: User };
// ===========================================================

const ProfileEditPageView = ({ user }: Props) => {
  const INITIAL_VALUES = {
    email: user.email || "",
    contact: user.phone || "",
    last_name: user.name.lastName || "",
    first_name: user.name.firstName || "",
    birth_date: new Date(user.dateOfBirth) || new Date(),
  };

  const VALIDATION_SCHEMA = yup.object().shape({
    first_name: yup.string().required("First name is required"),
    last_name: yup.string().required("Last name is required"),
    email: yup.string().email("invalid email").required("Email is required"),
    contact: yup.string().required("Contact is required"),
    birth_date: yup.string().required("Birth date is required"),
  });

  const handleFormSubmit = async (values: typeof INITIAL_VALUES) => {
    console.log(values);
  };

  // SECTION TITLE HEADER LINK
  const HEADER_LINK = (
    <Button
      href="/profile"
      color="primary"
      LinkComponent={Link}
      sx={{ bgcolor: "primary.light", px: 4 }}
    >
      Back to Profile
    </Button>
  );

  return (
    <Fragment>
      {/* TITLE HEADER AREA */}
      <DashboardHeader
        Icon={Person}
        title="Edit Profile"
        button={HEADER_LINK}
        navigation={<Navigation />}
      />

      {/* PROFILE EDITOR FORM */}
      <Card1>
        <FlexBox alignItems="flex-end" mb={3}>
          <Avatar src="/assets/images/faces/ralph.png" sx={{ height: 64, width: 64 }} />

          <Box ml={-2.5}>
            <label htmlFor="profile-image">
              <Button
                component="span"
                color="secondary"
                sx={{ p: "8px", height: "auto", bgcolor: "grey.300", borderRadius: "50%" }}
              >
                <CameraEnhance fontSize="small" />
              </Button>
            </label>
          </Box>

          <Box display="none">
            <input
              onChange={(e) => console.log(e.target.files)}
              id="profile-image"
              accept="image/*"
              type="file"
            />
          </Box>
        </FlexBox>

        <Formik
          onSubmit={handleFormSubmit}
          initialValues={INITIAL_VALUES}
          validationSchema={VALIDATION_SCHEMA}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    name="first_name"
                    label="First Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.first_name}
                    error={!!touched.first_name && !!errors.first_name}
                    helperText={(touched.first_name && errors.first_name) as string}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    name="last_name"
                    label="Last Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.last_name}
                    error={!!touched.last_name && !!errors.last_name}
                    helperText={(touched.last_name && errors.last_name) as string}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    name="email"
                    type="email"
                    label="Email"
                    onBlur={handleBlur}
                    value={values.email}
                    onChange={handleChange}
                    error={!!touched.email && !!errors.email}
                    helperText={(touched.email && errors.email) as string}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="contact"
                    onBlur={handleBlur}
                    value={values.contact}
                    onChange={handleChange}
                    error={!!touched.contact && !!errors.contact}
                    helperText={(touched.contact && errors.contact) as string}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Birth Date"
                      value={addDays(parseISO(values.date), 1)}
                      onChange={(newValue) => setFieldValue("birth_date", newValue)}
                      slots={{ textField: TextField }}
                      slotProps={{
                        textField: {
                          sx: { mb: 1 },
                          size: "small",
                          fullWidth: true,
                          value: values.date,
                          helperText: (touched.birth_date && errors.birth_date) as string,
                          error: Boolean(!!touched.birth_date && !!errors.birth_date),
                        },
                      }}
                    />
                  </LocalizationProvider>
                </Grid>

                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary">
                    Save Changes
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </Card1>
    </Fragment>
  );
};

export default ProfileEditPageView;
