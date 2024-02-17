"use client";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import * as yup from "yup";
// DUMMY CUSTOM DATA
// LOCAL CUSTOM COMPONENTS
import { User1 } from "models/User.model";
import { useSession } from "next-auth/react";
import { useLazyGetAddressesQuery } from "services/address-api";
import BillingAddressForm from "./billing-address-form";
import ShippingForm from "./shipping-form";
import useCheckoutService from "hooks/useCheckoutService";
import { CheckoutContextAddress } from "contexts/CheckoutServiceContext";
// 
const CheckoutForm = () => {
  const { addressForm, handleSetAddressForm,handleAddBillingAddress } = useCheckoutService();
  const router = useRouter();
  const session = useSession();
  //
  const user = session?.data?.user as User1;
  //
  const [getAddresses, { isLoading: isAddressesLoading }] =
    useLazyGetAddressesQuery();
  //
  const [sameAsShipping, setSameAsShipping] = useState(false);
  const [addresses, setAddresses] = useState({
    data: [],
  });
  //
  const handleFetch = useCallback(async () => {
    try {
      const res = await getAddresses({ userId: user?.id || "" });
      setAddresses(res.data);
    } catch (error) {
      console.error(error);
    }
  }, [getAddresses, user?.id]);
  //
  useEffect(() => {
    if (user) handleFetch();
  }, [handleFetch, user]);
  //
  const shippingAddress = useMemo(
    () =>
      addresses?.data?.filter(
        (address) => address.addressType === "SHIPPING"
      )[0],
    [addresses?.data]
  );
  //
  const billingAddress = useMemo(
    () =>
      addresses?.data?.filter(
        (address) => address.addressType === "BILLING"
      )[0],
    [addresses?.data]
  );
  //
  const initialValues = useMemo(
    () => ({
      shipping_zip: shippingAddress?.postalCode,
      shipping_name: shippingAddress?.name,
      shipping_contact: shippingAddress?.contactNumber,
      shipping_address_line1: shippingAddress?.addressLine1,
      shipping_address_line2: shippingAddress?.addressLine2,
      shipping_province_or_state: shippingAddress?.provinceOrState,
      same_as_shipping: false,
      billing_zip: billingAddress?.postalCode,
      billing_name: billingAddress?.name,
      billing_contact: billingAddress?.contactNumber,
      billing_address_line1: billingAddress?.addressLine1,
      billing_address_line2: billingAddress?.addressLine2,
      billing_province_or_state: billingAddress?.provinceOrState,
    }),
    [billingAddress, shippingAddress]
  );
  //
  const handleFormSubmit = async (values: typeof initialValues) => {
    const body: CheckoutContextAddress = {
      ...values,
      billing_address_id: billingAddress?.id,
      shipping_address_id: shippingAddress?.id,
    };
    handleSetAddressForm(body);
    if(initialValues.same_as_shipping){
      router.push(`/payment?address_id=${shippingAddress?.id}`)
    }else{
      const address = await handleAddBillingAddress();
      if(address?.id) router.push(`/payment?address_id=${address?.id}`)
    }
  };
  //
  console.log(addressForm);
  //
  return !isAddressesLoading ? (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={checkoutSchema}
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
      }) => {
        const handleCheckboxChange = (checked: boolean) => {
          setSameAsShipping(checked);
          setFieldValue("same_as_shipping", checked);
          setFieldValue("billing_name", checked ? values.shipping_name : "");
        };

        return (
          <form onSubmit={handleSubmit}>
            <ShippingForm
              values={values}
              errors={errors}
              touched={touched}
              handleBlur={handleBlur}
              handleChange={handleChange}
              setFieldValue={setFieldValue}
            />

            <BillingAddressForm
              errors={errors}
              handleBlur={handleBlur}
              handleChange={handleChange}
              handleCheckboxChange={handleCheckboxChange}
              sameAsShipping={sameAsShipping}
              setFieldValue={setFieldValue}
              touched={touched}
              values={values}
            />

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
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                >
                  Proceed to Payment
                </Button>
              </Grid>
            </Grid>
          </form>
        );
      }}
    </Formik>
  ) : (
    <></>
  );
};

// uncomment these fields below for from validation
const checkoutSchema = yup.object().shape({
  // shipping_name: yup.string().required("required"),
  // shipping_email: yup.string().email("invalid email").required("required"),
  // shipping_contact: yup.string().required("required"),
  // shipping_zip: yup.string().required("required"),
  // shipping_country: yup.object().required("required"),
  // shipping_address1: yup.string().required("required"),
  // billing_name: yup.string().required("required"),
  // billing_email: yup.string().required("required"),
  // billing_contact: yup.string().required("required"),
  // billing_zip: yup.string().required("required"),
  // billing_country: yup.object().required("required"),
  // billing_address1: yup.string().required("required"),
});

export default CheckoutForm;
