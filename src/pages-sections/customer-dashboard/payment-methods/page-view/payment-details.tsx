"use client";

import { Fragment } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
// GLOBAL CUSTOM COMPONENTS
import Card1 from "components/Card1";
// Local CUSTOM COMPONENT
import Header from "../header";

const PaymentDetailsPageView = () => {
  const INITIAL_VALUES = {
    exp: "",
    cvc: "",
    name: "",
    card_no: "",
  };

  const VALIDATION_SCHEMA = yup.object().shape({
    name: yup.string().required("required"),
    card_no: yup.string().required("required"),
    exp: yup.string().required("required"),
    cvc: yup.string().required("required"),
  });

  const handleFormSubmit = async (values: any) => {
    console.log(values);
  };

  return (
    <Fragment>
      {/* TITLE HEADER AREA */}
      <Header title="Add New" href="/payment-methods" buttonText="Back Payment Methods" />

      {/* PAYMENT DETAILS EDIT FORM */}
      <Card1>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={INITIAL_VALUES}
          validationSchema={VALIDATION_SCHEMA}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    name="card_no"
                    label="Card Number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.card_no || ""}
                    error={!!touched.card_no && !!errors.card_no}
                    helperText={(touched.card_no && errors.card_no) as string}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    name="name"
                    label="Name on Card"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name || ""}
                    error={!!touched.name && !!errors.name}
                    helperText={(touched.name && errors.name) as string}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    name="exp"
                    label="Exp. Date"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.exp || ""}
                    error={!!touched.exp && !!errors.exp}
                    helperText={(touched.exp && errors.exp) as string}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    name="cvc"
                    label="CVC"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.cvc || ""}
                    error={!!touched.cvc && !!errors.cvc}
                    helperText={(touched.cvc && errors.cvc) as string}
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
      </Card1>
    </Fragment>
  );
};

export default PaymentDetailsPageView;
