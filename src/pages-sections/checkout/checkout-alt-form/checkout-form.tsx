"use client";
import { useEffect, useState } from "react";
// LOCAL CUSTOM COMPONENTS
import DeliveryAddress from "./delivery-address";

import { Button, Grid, Link } from "@mui/material";
import useCheckoutService from "hooks/useCheckoutService";
import Address, { POSTAddressResponse } from "models/Address.model";
import { User1 } from "models/User.model";
import { useSession } from "next-auth/react";
import { useLazyGetAddressesQuery } from "services/address-api";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";

type Props = {
  address: Address;
  type: "CART" | "BUY_NOW";
};
const CheckoutForm2 = ({ address, type = "CART" }: Props) => {
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const session = useSession();
  //
  const [getAddresses, { data: addressesData }] = useLazyGetAddressesQuery();
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
        addressesData?.data || address,
        "BILLING",
        handleSetSelectedBillingAddressId
      )
    );
    setShippingAddresses(
      filterAddressesByType(
        addressesData?.data || address,
        "SHIPPING",
        handleSetSelectedShippingAddressId
      )
    );
  }, [address, addressesData]);

  //
  const proceedToPayment = () => {
    if (!selectedBillingAddressId && !selectedShippingAddressId) {
      enqueueSnackbar("Select your shipping & billing address", {
        variant: "warning",
      });
      return;
    }
    if (!selectedBillingAddressId) {
      enqueueSnackbar("Select your billing address", { variant: "warning" });
      return;
    }
    if (!selectedShippingAddressId) {
      enqueueSnackbar("Select your shipping address", { variant: "warning" });
      return;
    }

    push(type==="CART"? "/payment": "/buy-now/payment");
  };
  //
  return (
    <>
      <DeliveryAddress
        handleFetch={() => getAddresses({ userId: user?.id || "" })}
        addresses={shippingAddresses}
        setAddresses={setShippingAddresses}
        addressType="SHIPPING"
        selectedAddressId={selectedShippingAddressId}
        section={1}
      />
      <DeliveryAddress
        handleFetch={() => getAddresses({ userId: user?.id || "" })}
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
            Back to {type === "CART" ? "Cart" : "Items"}
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
