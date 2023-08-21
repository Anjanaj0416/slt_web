"use client";

import Link from "next/link";
import { useState, Fragment } from "react";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import Pagination from "@mui/material/Pagination";
import IconButton from "@mui/material/IconButton";
// Local CUSTOM COMPONENT
import Header from "../header";
import TableRow from "../table-row";
// GLOBAL CUSTOM COMPONENTS
import { FlexBox } from "components/flex-box";
// CUSTOM DATA MODEL
import Address from "models/Address.model";
import { Paragraph } from "components/Typography";

// =======================================================
type Props = { addressList: Address[] };
// =======================================================

const AddressPageView = ({ addressList }: Props) => {
  const [allAddress, setAllAddress] = useState(addressList);

  // HANDLE ADDRESS DELETE
  const handleAddressDelete = (id: string) => {
    setAllAddress(allAddress.filter((item) => item.id !== id));
  };

  return (
    <Fragment>
      {/* TITLE HEADER AREA */}
      <Header href="#" title="My Addresses" buttonText="Add New Address" />

      {/* ALL ADDRESS LIST AREA */}
      {allAddress.map((address) => (
        <TableRow key={address.id}>
          <Paragraph ellipsis>{address.title}</Paragraph>
          <Paragraph ellipsis>{`${address.street}, ${address.city}`}</Paragraph>
          <Paragraph ellipsis>{address.phone}</Paragraph>
          <Paragraph color="grey.600">
            <IconButton LinkComponent={Link} href={`/address/${address.id}`}>
              <Edit fontSize="small" color="inherit" />
            </IconButton>

            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                handleAddressDelete(address.id);
              }}
            >
              <Delete fontSize="small" color="inherit" />
            </IconButton>
          </Paragraph>
        </TableRow>
      ))}

      {/* PAGINATION AREA */}
      <FlexBox justifyContent="center" mt={5}>
        <Pagination count={5} onChange={(data) => console.log(data)} />
      </FlexBox>
    </Fragment>
  );
};

export default AddressPageView;
