"use client";

import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import * as yup from "yup";
// LOCAL CUSTOM COMPONENTS
import DeliveryAddress from "./delivery-address";

import { Button, Grid, Link } from "@mui/material";
import { InitialValues } from "./_types";
import { useLazyGetAddressesQuery } from "services/address-api";
import { useSession } from "next-auth/react";
import { User1 } from "models/User.model";
import { POSTAddressResponse } from "models/Address.model";
import useCheckoutService from "hooks/useCheckoutService";

const CheckoutForm2 = () => {
  const router = useRouter();
  const session = useSession();
  //
  const [getAddresses] = useLazyGetAddressesQuery();
  const { selectedBillingAddressId, selectedShippingAddressId } =
    useCheckoutService();
  //
  const [addresses, setAddresses] = useState({
    data: [],
  });
  //
  const user = session?.data?.user as User1;
  //
  const [shippingAddresses, setShippingAddresses] = useState<
    POSTAddressResponse[]
  >([]);
  //
  const [billingAddresses, setBillingAddresses] = useState<
    POSTAddressResponse[]
  >([]);
  //
  const handleFetch = useCallback(async () => {
    try {
      const res = await getAddresses({ userId: user?.id || "" });
      setAddresses(res?.data);
      setBillingAddresses(
        res?.data?.data?.filter((address) => address?.addressType === "BILLING")
      );
      setShippingAddresses(
        res?.data?.data?.filter(
          (address) => address?.addressType === "SHIPPING"
        )
      );
    } catch (error) {
      console.error(error);
    }
  }, [getAddresses, user?.id]);
  //
  useEffect(() => {
    if (user) handleFetch();
  }, [handleFetch, user]);
  //
  const initialValues = useMemo(
    () => ({
      shipping_zip: "",
      shipping_name: "",
      shipping_contact: "",
      shipping_address_line1: "",
      shipping_address_line2: "",
      shipping_province_or_state: "",
      billing_zip: "",
      billing_name: "",
      billing_contact: "",
      billing_address_line1: "",
      billing_address_line2: "",
      billing_province_or_state: "",
    }),
    []
  );
  //
  //
  const handleFormSubmit = async (values) => {
    console.log(values);
    // router.push("/payment");
  };
  //
  return (
    <>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => {
          // CHANGE FIELD VALUE DATA
          const handleFieldValueChange = (value: string, fieldName: string) => {
            setFieldValue(fieldName, value);
          };

          return (
            <form onSubmit={handleSubmit}>
              <DeliveryAddress
                handleFieldValueChange={handleFieldValueChange}
                values={values}
                addresses={shippingAddresses}
                setAddresses={setShippingAddresses}
                addressType="SHIPPING"
                selectedAddressId={selectedShippingAddressId}
              />
            </form>
          );
        }}
      </Formik>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => {
          // CHANGE FIELD VALUE DATA
          const handleFieldValueChange = (value: string, fieldName: string) => {
            setFieldValue(fieldName, value);
          };

          return (
            <form onSubmit={handleSubmit}>
              <DeliveryAddress
                handleFieldValueChange={handleFieldValueChange}
                values={values}
                addresses={billingAddresses}
                setAddresses={setBillingAddresses}
                addressType={"BILLING"}
                selectedAddressId={selectedBillingAddressId}
              />
            </form>
          );
        }}
      </Formik>
      <Grid container spacing={6}>
        <Grid item sm={6} xs={12}>
          <Button
            LinkComponent={Link}
            variant="outlined"
            color="primary"
            type="button"
            href="/cart"
            fullWidth
          >
            Back to Cart
          </Button>
        </Grid>

        <Grid item sm={6} xs={12}>
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Proceed to Payment
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

const checkoutSchema = yup.object().shape({
  card: yup.string().required("required"),
  date: yup.string().required("required"),
  time: yup.string().required("required"),
  address: yup.string().required("required"),
  cardHolderName: yup.string().required("required"),
  cardNumber: yup.number().required("required"),
  cardMonth: yup.string().required("required"),
  cardYear: yup.number().required("required"),
  cardCVC: yup.number().required("required"),
  voucher: yup.string(),
});

export default CheckoutForm2;
