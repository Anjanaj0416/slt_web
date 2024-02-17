'use client'
import { POSTAddressResponse } from "models/Address.model";
import { User1 } from "models/User.model";
import { useSession } from "next-auth/react";
import React, {
  ReactNode,
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";
import { usePostAddressMutation } from "services/address-api";
//
export interface CheckoutContextAddress {
  shipping_address_id: string;
  shipping_zip: string;
  shipping_name: string;
  shipping_contact: string;
  shipping_address_line1: string;
  shipping_address_line2: string;
  shipping_province_or_state: string;
  billing_address_id: string;
  billing_zip: string;
  billing_name: string;
  billing_contact: string;
  billing_address_line1: string;
  billing_address_line2: string;
  billing_province_or_state: string;
  same_as_shipping: boolean;
}
//
const initialState = {
  shipping_address_id: "",
  shipping_zip: "",
  shipping_name: "",
  shipping_contact: "",
  shipping_address_line1: "",
  shipping_address_line2: "",
  shipping_province_or_state: "",
  billing_address_id: "",
  billing_zip: "",
  billing_name: "",
  billing_contact: "",
  billing_address_line1: "",
  billing_address_line2: "",
  billing_province_or_state: "",
  same_as_shipping: false,
};
//
export const CheckoutServiceContext = createContext({
  addressForm: initialState,
  handleSetAddressForm: (_: CheckoutContextAddress) => {},
  handleAddBillingAddress: (): Promise<POSTAddressResponse | undefined> =>
    undefined,
  isAddingAddress: false,
});
//
type Props = {
  children: ReactNode;
};
//
const CheckoutServiceContextProvider = (props: Props) => {
  const [addAddress, { isLoading: isAddingAddress }] = usePostAddressMutation();
  const session = useSession();
  //
  const user = session?.data?.user as User1;
  //
  const [addressForm, setAddress] =
    useState<CheckoutContextAddress>(initialState);
  //
  const handleSetAddressForm = (body: Partial<CheckoutContextAddress>) => {
    setAddress((prev) => ({ ...prev, ...body }));
  };
  //
  const handleAddBillingAddress: () => Promise<
    POSTAddressResponse | undefined
  > = useCallback(async () => {
    if (addressForm?.same_as_shipping) return;
    try {
      //
      const body = {
        addressType: "BILLING",
        name: addressForm?.billing_name,
        addressLine1: addressForm?.billing_address_line1,
        addressLine2: addressForm?.billing_address_line2,
        postalCode: addressForm?.billing_zip,
        country: "Sri Lanka",
        provinceOrState: addressForm?.billing_province_or_state,
        contactNumber: addressForm?.billing_contact,
      };
      //
      const res = await addAddress({
        userId: user?.id,
        body,
      });

      if ("data" in res) {
        const created_address = (res as { data: POSTAddressResponse }).data;

        if (
          "id" in created_address &&
          typeof created_address?.id === "string"
        ) {
          handleSetAddressForm({
            billing_address_id: created_address.id,
          });
        }

        return created_address;
      }
    } catch (error) {
      console.error(error);
    }
  }, [addAddress, addressForm, user?.id]);
  //
  const contextValue = useMemo(
    () => ({
      addressForm,
      handleSetAddressForm,
      handleAddBillingAddress,
      isAddingAddress,
    }),
    [addressForm, handleAddBillingAddress, isAddingAddress]
  );
  //
  return (
    <CheckoutServiceContext.Provider value={contextValue}>
      {props.children}
    </CheckoutServiceContext.Provider>
  );
};
//
export default CheckoutServiceContextProvider;
