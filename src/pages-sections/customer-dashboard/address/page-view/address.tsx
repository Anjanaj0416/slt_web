"use client";

import { Fragment, useEffect, useState } from "react";
import Place from "@mui/icons-material/Place";
// Local CUSTOM COMPONENT
import Pagination from "../../pagination";
import AddressListItem from "../address-item";
import DashboardHeader from "../../dashboard-header";
// CUSTOM DATA MODEL
import { POSTAddressResponse } from "models/Address.model";
import { useRouter } from "next/navigation";
import useCheckoutService from "hooks/useCheckoutService";
import { useSnackbar } from "notistack";

// =======================================================
type Props = {
  addressList: POSTAddressResponse[];
  totalPages: number;
  page: number;
};
// =======================================================

const AddressPageView = ({ addressList, totalPages, page }: Props) => {
  const router = useRouter();
  const { handleDeleteAddress, isDeletingAddress } = useCheckoutService();
  const { enqueueSnackbar } = useSnackbar();

  const [addresses, setAddresses] = useState<POSTAddressResponse[]>();

  useEffect(() => {
    setAddresses(addressList);
  }, [addressList, page]);

  // HANDLE ADDRESS DELETE
  const handleAddressDelete = async (id: string) => {
    try {
      await handleDeleteAddress(id);
      enqueueSnackbar("Address deleted successfully!", {
        variant: "success",
      });
      if (addresses) {
        setAddresses((prvState) => prvState?.filter((addr) => addr.id !== id));
      } else {
        setAddresses(addressList.filter((addr) => addr.id !== id));
      }
    } catch (e) {}
  };

  const handlePage = (page: number) => {
    router.push(page == 1 ? "/address" : `/address?page=${page}`);
  };

  return (
    <Fragment>
      {/* TITLE HEADER AREA */}
      <DashboardHeader
        Icon={Place}
        href="/address"
        title="My Addresses"
        buttonText="Add New Address"
      />

      {/* ALL ADDRESS LIST AREA */}
      {(addresses || addressList).map((address) => (
        <AddressListItem
          key={address.id}
          isDeleting={isDeletingAddress}
          address={address}
          handleDelete={handleAddressDelete}
        />
      ))}

      {/* PAGINATION AREA */}
      <Pagination
        count={totalPages || 1}
        page={page + 1}
        onChange={(_, page) => handlePage(page)}
      />
    </Fragment>
  );
};

export default AddressPageView;
