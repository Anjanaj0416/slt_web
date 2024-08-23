import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import { Dispatch, FC, SetStateAction, useState } from "react";
// MUI ICON COMPONENTS
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import ModeEditOutline from "@mui/icons-material/ModeEditOutline";
// LOCAL CUSTOM COMPONENTS
import EditAddressForm from "./edit-address-form";
import Heading from "./heading";
import NewAddressForm from "./new-address-form";
// GLOBAL CUSTOM COMPONENTS
import { H6, Paragraph } from "components/Typography";
import { FlexBetween, FlexBox } from "components/flex-box";
import useCheckoutService from "hooks/useCheckoutService";
import { POSTAddressResponse } from "models/Address.model";
import { upperCaseToCapitalize } from "utils/strings";
import { useSnackbar } from "notistack";

// ==============================================================
interface Props {
  addresses: Array<POSTAddressResponse>;
  setAddresses: Dispatch<SetStateAction<POSTAddressResponse[]>>;
  addressType: POSTAddressResponse["addressType"];
  selectedAddressId: string;
  section: number;
  handleFetch: Function;
}
// ==============================================================

const DeliveryAddress: FC<Props> = ({
  addresses,
  setAddresses,
  addressType,
  selectedAddressId,
  section,
  handleFetch,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const {
    handleSetSelectedBillingAddressId,
    handleSetSelectedShippingAddressId,
    handleDeleteAddress,
  } = useCheckoutService();

  const [editAddressId, setEditAddressId] = useState("");

  const handleDelete = async (id: string) => {
    try {
      await handleDeleteAddress(id);
      setAddresses((prev) => prev.filter((item) => item?.id !== id));
      enqueueSnackbar("Address successfully deleted", { variant: "success" });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card sx={{ p: 3, mb: 3 }}>
      {/* HEADING & BUTTON SECTION */}
      <FlexBetween mb={4}>
        <Heading
          number={section}
          title={`${upperCaseToCapitalize(addressType)} Address`}
          mb={0}
        />
        <NewAddressForm addressType={addressType} handleFetch={handleFetch} />
      </FlexBetween>

      {/* ADDRESS LIST SECTION */}
      <Grid container spacing={3}>
        {addresses?.map((item, ind) => (
          <Grid item md={4} sm={6} xs={12} key={ind}>
            <Card
              onClick={() =>
                item.addressType === "BILLING"
                  ? handleSetSelectedBillingAddressId(item?.id)
                  : handleSetSelectedShippingAddressId(item?.id)
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
                  onClick={() => setEditAddressId(item?.id)}
                >
                  <ModeEditOutline fontSize="inherit" />
                </IconButton>

                <IconButton
                  size="small"
                  color="error"
                  onClick={() => handleDelete(item?.id)}
                >
                  <DeleteOutline fontSize="inherit" />
                </IconButton>
              </FlexBox>

              <H6 mb={0.5}>{item?.name}</H6>
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
          active={!!editAddressId}
          address={addresses.find((item) => item.id === selectedAddressId)}
          setEditAddressId={setEditAddressId}
          handleFetch={handleFetch}
        />
      ) : null}
    </Card>
  );
};

export default DeliveryAddress;
