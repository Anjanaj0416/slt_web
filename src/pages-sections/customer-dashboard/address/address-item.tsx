import { FC, useState } from "react";
import Link from "next/link";
import IconButton from "@mui/material/IconButton";
// MUI ICON COMPONENTS
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";

import { Paragraph } from "components/Typography";
// Local CUSTOM COMPONENT
import TableRow from "../table-row";
// CUSTOM DATA MODEL
import { POSTAddressResponse } from "models/Address.model";

// ==============================================================
interface Props {
  isDeleting: boolean;
  address: POSTAddressResponse;
  handleDelete: (id: string) => void;
  handleEdit: (address: POSTAddressResponse) => void;
}
// ==============================================================

const AddressListItem: FC<Props> = ({
  address,
  isDeleting,
  handleDelete,
  handleEdit,
}) => {
  const { addressType, addressLine1, provinceOrState, contactNumber, name, id } =
    address || {};
  const [selectedId, setSelectedId] = useState<string>();
  return (
    <TableRow>
      <Paragraph ellipsis>{addressType}</Paragraph>
      <Paragraph ellipsis>{`${name}, ${addressLine1}, ${provinceOrState}`}</Paragraph>
      <Paragraph ellipsis>{contactNumber}</Paragraph>
      <Paragraph color="grey.600">
        <IconButton onClick={() => handleEdit(address)}>
          <Edit fontSize="small" color="inherit" />
        </IconButton>

        <IconButton
          disabled={isDeleting && selectedId === id}
          onClick={(e) => {
            setSelectedId(id);
            e.stopPropagation();
            handleDelete(id);
          }}
        >
          <Delete fontSize="small" color="inherit" />
        </IconButton>
      </Paragraph>
    </TableRow>
  );
};

export default AddressListItem;
