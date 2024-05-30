"use client";
import { useCallback, useEffect, useState } from "react";
// LOCAL CUSTOM COMPONENTS
import DeliveryAddress from "./delivery-address";

import { Button, Grid, Link } from "@mui/material";
import useCheckoutService from "hooks/useCheckoutService";
import { POSTAddressResponse } from "models/Address.model";
import { User1 } from "models/User.model";
import { useSession } from "next-auth/react";
import { useLazyGetAddressesQuery } from "services/address-api";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";

const CheckoutForm2 = ({ address }) => {
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const session = useSession();
  //
  const [getAddresses] = useLazyGetAddressesQuery();
  const {
    selectedBillingAddressId,
    selectedShippingAddressId,
    handleSetSelectedBillingAddressId,
    handleSetSelectedShippingAddressId,
  } = useCheckoutService();
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
  const filterAddressesByType = (
    addresses,
    type,
    handleSetSelectedAddressId
  ) => {
    return addresses?.filter((addressItem) => {
      if (addressItem?.addressType === type) {
        if (addressItem.primary) {
          handleSetSelectedAddressId(addressItem.id);
        }
        return true;
      }
    });
  };
  //
  useEffect(() => {
    setBillingAddresses(
      filterAddressesByType(
        address,
        "BILLING",
        handleSetSelectedBillingAddressId
      )
    );
    setShippingAddresses(
      filterAddressesByType(
        address,
        "SHIPPING",
        handleSetSelectedShippingAddressId
      )
    );
  }, [address]);
  //
  const handleFetch = useCallback(async () => {
    try {
      const response = await getAddresses({ userId: user?.id || "" });
      setBillingAddresses(
        filterAddressesByType(
          response?.data?.data,
          "BILLING",
          handleSetSelectedBillingAddressId
        )
      );
      setShippingAddresses(
        filterAddressesByType(
          response?.data?.data,
          "SHIPPING",
          handleSetSelectedShippingAddressId
        )
      );
    } catch (error) {
      console.error(error);
    }
  }, [user]);

  //
  const proceedToPayment = () => {
    if (selectedBillingAddressId === "" || selectedShippingAddressId === "") {
      enqueueSnackbar("Address successfully updated", { variant: "success" });
      return;
    }
    push("/payment");
  };
  //
  return (
    <>
      <DeliveryAddress
        handleFetch={handleFetch}
        addresses={shippingAddresses}
        setAddresses={setShippingAddresses}
        addressType="SHIPPING"
        selectedAddressId={selectedShippingAddressId}
        section={1}
      />
      <DeliveryAddress
        handleFetch={handleFetch}
        addresses={billingAddresses}
        setAddresses={setBillingAddresses}
        addressType={"BILLING"}
        selectedAddressId={selectedBillingAddressId}
        section={2}
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
            onClick={proceedToPayment}
          >
            Proceed to Payment
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
//
export default CheckoutForm2;
