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
import NewAddressForm from "../create-address-form";
import EditAddressForm from "../edit-address-form";
import { Box } from "@mui/material";

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
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [addresses, setAddresses] = useState<POSTAddressResponse[]>();
  const [editingAddress, setEditingAddress] = useState<POSTAddressResponse>();

  const handleCloseModal = () => setOpenCreateModal(false);
  const handleOpenModal = () => {
    if (addresses.length > 9) {
      enqueueSnackbar("The maximum address count should be 10 or less!", {
        variant: "warning",
      });
      return;
    }
    setOpenCreateModal(true);
  };

  const handleEditCloseModal = () => setEditingAddress(null);
  const handleEditOpenModal = (address: POSTAddressResponse) => {
    setEditingAddress(address);
  };

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
    router.push(page < 2 ? "/address" : `/address?page=${page}`);
  };

  const handleUpdatedAddress = async (address: POSTAddressResponse) => {
    if (addresses) {
      setAddresses(
        (prvState) =>
          prvState?.map((addr) => (addr.id === address.id ? address : addr))
      );
    } else {
      setAddresses(
        addressList.map((addr) => (addr.id === address.id ? address : addr))
      );
    }
  };

  return (
    <Fragment>
      {/* TITLE HEADER AREA */}
      <DashboardHeader
        Icon={Place}
        onClick={handleOpenModal}
        title="My Addresses"
        buttonText="Add New Address"
      />
      <NewAddressForm
        handleFetch={() => handlePage(page)}
        handleCloseModal={handleCloseModal}
        openModal={openCreateModal}
      />
      {editingAddress ? (
        <EditAddressForm
          openModal={!!editingAddress}
          address={editingAddress}
          handleFetch={handleUpdatedAddress}
          handleCloseModal={handleEditCloseModal}
        />
      ) : null}
      {/* ALL ADDRESS LIST AREA */}
      {addresses || addressList ? (
        (addresses || addressList).map((address) => (
          <AddressListItem
            key={address.id}
            isDeleting={isDeletingAddress}
            address={address}
            handleDelete={handleAddressDelete}
            handleEdit={handleEditOpenModal}
          />
        ))
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "200px",
            fontWeight: "semibold",
            fontSize: "18px",
          }}
        >
          There is no addresses !
        </Box>
      )}

      {/* PAGINATION AREA */}
      {(addresses || addressList) && (
        <Pagination
          count={totalPages || 1}
          page={page + 1}
          onChange={(_, page) => handlePage(page)}
        />
      )}
    </Fragment>
  );
};

export default AddressPageView;
