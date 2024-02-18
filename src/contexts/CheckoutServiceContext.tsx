'use client'
import { POSTAddressRequest, POSTAddressResponse } from "models/Address.model";
import { User1 } from "models/User.model";
import { useSession } from "next-auth/react";
import React, {
  ReactNode,
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";
import {
  useDeleteAddressMutation,
  usePostAddressMutation,
} from "services/address-api";
//
export const CheckoutServiceContext = createContext({
  handleAddAddress: (
    _: POSTAddressRequest
  ): Promise<POSTAddressResponse | undefined> => undefined,
  isAddingAddress: false,
  isDeletingAddress: false,
  selectedBillingAddressId: "",
  selectedShippingAddressId: "",
  handleSetSelectedBillingAddressId: (_: string) => {},
  handleSelectedShippingAddressId: (_: string) => {},
  handleDeleteAddress: (_: string): Promise<POSTAddressResponse | undefined> =>
    undefined,
});
//
type Props = {
  children: ReactNode;
};
//
const CheckoutServiceContextProvider = (props: Props) => {
  const [addAddress, { isLoading: isAddingAddress }] = usePostAddressMutation();
  const [deleteAddress, { isLoading: isDeletingAddress }] =
    useDeleteAddressMutation();
  const session = useSession();
  //
  const user = session?.data?.user as User1;
  //
  const [selectedBillingAddressId, setSelectedBillingAddressId] =
    useState<string>("");
  const [selectedShippingAddressId, setSelectedShippingAddressId] =
    useState<string>("");
  //
  const handleSetSelectedBillingAddressId = useCallback((id: string) => {
    setSelectedBillingAddressId(id);
  }, []);
  //
  const handleSelectedShippingAddressId = useCallback((id: string) => {
    setSelectedShippingAddressId(id);
  }, []);
  //
  const handleAddAddress: (
    address: POSTAddressRequest
  ) => Promise<POSTAddressResponse | undefined> = useCallback(
    async (address) => {
      try {
        //
        const res = await addAddress({
          userId: user?.id,
          body: address,
        });

        if ("data" in res) {
          const created_address = (res as { data: POSTAddressResponse })?.data;

          if (
            "id" in created_address &&
            typeof created_address?.id === "string"
          ) {
            created_address.addressType === "BILLING"
              ? setSelectedBillingAddressId(created_address?.id)
              : setSelectedShippingAddressId(created_address?.id);
          }
          //
          return created_address;
        }
      } catch (error) {
        console.error(error);
      }
    },
    [addAddress, user?.id]
  );
  //
  const handleDeleteAddress = useCallback(
    async (id: string): Promise<POSTAddressResponse | undefined> => {
      try {
        const res = await deleteAddress({ userId: user?.id, addressId: id });
        return "data" in res
          ? (res as { data: POSTAddressResponse })?.data
          : undefined;
      } catch (error) {
        console.error(error);
      }
    },
    [deleteAddress, user?.id]
  );
  //
  const contextValue = useMemo(
    () => ({
      isAddingAddress,
      isDeletingAddress,
      selectedBillingAddressId,
      selectedShippingAddressId,
      handleAddAddress,
      handleSetSelectedBillingAddressId,
      handleSelectedShippingAddressId,
      handleDeleteAddress,
    }),
    [
      handleAddAddress,
      handleSelectedShippingAddressId,
      handleSetSelectedBillingAddressId,
      handleDeleteAddress,
      isAddingAddress,
      isDeletingAddress,
      selectedBillingAddressId,
      selectedShippingAddressId,
    ]
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
