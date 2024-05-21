"use client";

import { FC } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Formik } from "formik";
import * as yup from "yup";
// CUSTOM DATA MODEL
import { User1 } from "models/User.model";

// ==============================================================
type Props = { user: User1; onSubmit: (values: any) => void };
// ==============================================================
const ProfileEditForm: FC<Props> = ({ user, onSubmit }) => {
  const initialValues = {
    email: user?.email || "",
    phone: user?.phone || "",
    lastName: user?.lastName || "",
    firstName: user?.firstName || "",
    birthDay:
      user?.birthDay && user?.birthDay !== ""
        ? new Date(user?.birthDay)
        : new Date(),
  };
  //
  const validationSchema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email("invalid email").required("Email is required"),
    phone: yup.string().required("Phone Number is required"),
    birthDay: yup.date().required("Birth date is required"),
  });
  console.log(initialValues);

  //
  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
      }) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                name="firstName"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values?.firstName}
                error={!!touched.firstName && !!errors.firstName}
                helperText={(touched.firstName && errors.firstName) as string}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                name="lastName"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values?.lastName}
                error={!!touched.lastName && !!errors.lastName}
                helperText={(touched.lastName && errors.lastName) as string}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                name="email"
                type="email"
                label="Email"
                onBlur={handleBlur}
                value={values?.email}
                onChange={handleChange}
                error={!!touched.email && !!errors.email}
                helperText={(touched.email && errors.email) as string}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                onBlur={handleBlur}
                value={values?.phone}
                onChange={handleChange}
                error={!!touched.phone && !!errors.phone}
                helperText={(touched.phone && errors.phone) as string}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <DatePicker
                label="Birth Date"
                value={values?.birth_date}
                onChange={(newValue) => setFieldValue("birthDay", newValue)}
                slots={{ textField: TextField }}
                slotProps={{
                  textField: {
                    sx: { mb: 1 },
                    size: "small",
                    fullWidth: true,
                    error: Boolean(!!touched.birth_date && !!errors.birth_date),
                    helperText: (touched.birth_date &&
                      errors.birth_date) as string,
                  },
                }}
              />
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
  );
};

export default ProfileEditForm;
