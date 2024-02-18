import { FC, SetStateAction, useState, Dispatch } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import { FormikErrors } from "formik";
// MUI ICON COMPONENTS
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import ModeEditOutline from "@mui/icons-material/ModeEditOutline";
// LOCAL CUSTOM COMPONENTS
import Heading from "./heading";
import NewAddressForm from "./new-address-form";
import EditAddressForm from "./edit-address-form";
// GLOBAL CUSTOM COMPONENTS
import { H6, Paragraph } from "components/Typography";
import { FlexBetween, FlexBox } from "components/flex-box";
import { Address, InitialValues } from "./_types";
import { POSTAddressResponse } from "models/Address.model";
import useCheckoutService from "hooks/useCheckoutService";
import { upperCaseToCapitalize } from "utils/strings";

// ==============================================================
interface Props {
  values: FormikErrors<InitialValues>;
  handleFieldValueChange: (value: string, fieldName: string) => void;
  addresses: Array<POSTAddressResponse>;
  setAddresses: Dispatch<SetStateAction<POSTAddressResponse[]>>;
  addressType: POSTAddressResponse["addressType"];
  selectedAddressId: string;
}
// ==============================================================

const DeliveryAddress: FC<Props> = ({
  values,
  handleFieldValueChange,
  addresses,
  setAddresses,
  addressType,
  selectedAddressId,
}) => {
  const {
    handleSetSelectedBillingAddressId,
    handleSelectedShippingAddressId,
    handleDeleteAddress,
    selectedBillingAddressId,
    selectedShippingAddressId,
  } = useCheckoutService();

  const [editAddressId, setEditAddressId] = useState("");

  const changeEditAddressId = () => setEditAddressId("");

  const handleAddNewAddress = (address: Address) => {
    // setAddressList((state) => [...state, { ...address, id: Date.now() }]);
  };

  const handleEditAddress = (addressId: number, data: Address) => {
    // setAddressList((state) => {
    //   return state.map((item) => {
    //     if (item.id === addressId) return { ...data };
    //     else return item;
    //   });
    // });
  };

  const handleDelete = (id: string) => async (params) => {
    try {
      await handleDeleteAddress(id);
      setAddresses((prev) => prev.filter((item) => item?.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card sx={{ p: 3, mb: 3 }}>
      {/* HEADING & BUTTON SECTION */}
      <FlexBetween mb={4}>
        <Heading
          number={2}
          title={`${upperCaseToCapitalize(addressType)} Address`}
          mb={0}
        />
        <NewAddressForm handleAddNewAddress={handleAddNewAddress} />
      </FlexBetween>

      {/* ADDRESS LIST SECTION */}
      <Grid container spacing={3}>
        {addresses?.map((item, ind) => (
          <Grid item md={4} sm={6} xs={12} key={ind}>
            <Card
              onClick={() =>
                item.addressType === "BILLING"
                  ? handleSetSelectedBillingAddressId(item?.id)
                  : handleSelectedShippingAddressId(item?.id)
              }
              sx={{
                padding: 2,
                boxShadow: "none",
                cursor: "pointer",
                border: "1px solid",
                position: "relative",
                backgroundColor: "grey.100",
                borderColor:
                  selectedAddressId === item?.id
                    ? "primary.main"
                    : "transparent",
              }}
            >
              <FlexBox position="absolute" top={5} right={5}>
                <IconButton
                  size="small"
                  onClick={() => setEditAddressId(item.id)}
                >
                  <ModeEditOutline fontSize="inherit" />
                </IconButton>

                <IconButton
                  size="small"
                  color="error"
                  onClick={handleDelete(item.id)}
                >
                  <DeleteOutline fontSize="inherit" />
                </IconButton>
              </FlexBox>

              <H6 mb={0.5}>{item.name}</H6>
              <Paragraph color="grey.700">{item?.addressLine1}</Paragraph>
              {item?.addressLine1 ? (
                <Paragraph color="grey.700">{item?.addressLine2}</Paragraph>
              ) : null}
              <Paragraph color="grey.700">{item?.contactNumber}</Paragraph>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* SHOW EDIT ADDRESS FORM MODAL WHEN CLICK EDIT BUTTON */}
      {editAddressId ? (
        <EditAddressForm
          handleEditAddress={handleEditAddress}
          active={editAddressId ? true : false}
          changeEditAddressId={changeEditAddressId}
          address={addresses.find((item) => item.id === selectedAddressId)}
        />
      ) : null}
    </Card>
  );
};

export default DeliveryAddress;
