'use client'
import React, { ReactNode, createContext, useState } from "react";
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
});
//
type Props = {
  children: ReactNode;
};
//
const CheckoutServiceContextProvider = (props: Props) => {
  const [addressForm, setAddress] =
    useState<CheckoutContextAddress>(initialState);
  //
  const handleSetAddressForm = (body: CheckoutContextAddress) => {
    setAddress(body);
  };
  //
  return (
    <CheckoutServiceContext.Provider
      value={{ addressForm, handleSetAddressForm }}
    >
      {props.children}
    </CheckoutServiceContext.Provider>
  );
};
//
export default CheckoutServiceContextProvider;
