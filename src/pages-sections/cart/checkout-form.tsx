import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Link from "next/link";
// GLOBAL CUSTOM HOOK
// GLOBAL CUSTOM COMPONENTS
import { Span } from "components/Typography";
import { FlexBetween, FlexBox } from "components/flex-box";
// DUMMY CUSTOM DATA
// CUSTOM UTILS LIBRARY FUNCTION
import useCartService from "hooks/useCartService";
import { currency } from "lib";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useSnackbar } from "notistack";

const CheckoutForm = () => {
  const { push } = useRouter();
  const [comments, setComments] = useState("");
  const { totalDiscount, totalPrice, setNote, cart } = useCartService();
  const { enqueueSnackbar } = useSnackbar();

  const [voucherText, setVoucherText] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVoucherText(event.target.value); // Update the state with the input's value
  };

  const handleAddVoucher = () => {
    enqueueSnackbar("Invalid Voucher!", {
      variant: "error",
    });
  };

  // const STATE_LIST = [
  //   { value: "new-york", label: "New York" },
  //   { value: "chicago", label: "Chicago" },
  // ];
  //
  const navigateCheckout = () => {
    setNote(comments);
    push("/checkout");
  };
  //
  return (
    <Card sx={{ padding: 3 }}>
      <FlexBetween mb={2}>
        <Span color="grey.600">Total:</Span>

        <Span fontSize={18} fontWeight={600} lineHeight="1">
          {currency(totalPrice)}
        </Span>
      </FlexBetween>
      <FlexBetween mb={2}>
        <Span color="grey.600">Discount:</Span>

        <Span fontSize={18} fontWeight={600} lineHeight="1">
          {currency(totalDiscount)}
        </Span>
      </FlexBetween>
      <FlexBetween mb={2}>
        <Span color="grey.600">Sub Total:</Span>

        <Span fontSize={18} fontWeight={600} lineHeight="1">
          {currency(totalPrice - totalDiscount)}
        </Span>
      </FlexBetween>
      <Divider sx={{ mb: 2 }} />

      <FlexBox alignItems="center" columnGap={1} mb={2}>
        <Span fontWeight="600">Additional Comments</Span>

        <Span
          p="6px 10px"
          fontSize={12}
          lineHeight="1"
          borderRadius="3px"
          color="primary.main"
          bgcolor="primary.light"
        >
          Note
        </Span>
      </FlexBox>

      {/* COMMENTS TEXT FIELD */}
      <TextField
        variant="outlined"
        disabled={cart.cartItems.length < 1}
        onChange={(event) => setComments(event.target.value)}
        inputProps={{ maxLength: 200 }}
        rows={6}
        fullWidth
        multiline
      />

      <Divider sx={{ mb: 2 }} />

      {/* APPLY VOUCHER TEXT FIELD */}
      <TextField
        fullWidth
        disabled={cart.cartItems.length < 1}
        size="small"
        label="Voucher"
        variant="outlined"
        placeholder="Enter Voucher Code"
        value={voucherText}
        onChange={handleChange}
      />

      <Button
        variant="outlined"
        color="primary"
        fullWidth
        disabled={cart.cartItems.length < 1 || !voucherText}
        sx={{ mt: 2, mb: 4 }}
        onClick={handleAddVoucher}
      >
        Apply Voucher
      </Button>

      <Divider sx={{ mb: 2 }} />
      {/* 
      <Span fontWeight={600} mb={2} display="block">
        Shipping Estimates
      </Span> */}

      {/* COUNTRY TEXT FIELD */}
      {/* <Autocomplete
        fullWidth
        sx={{ mb: 2 }}
        options={countryList}
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            label="Country"
            variant="outlined"
            placeholder="Select Country"
          />
        )}
      /> */}

      {/* STATE/CITY TEXT FIELD */}
      {/* <TextField
        select
        fullWidth
        size="small"
        label="State"
        variant="outlined"
        placeholder="Select State"
        defaultValue="new-york"
      >
        {STATE_LIST.map(({ label, value }) => (
          <MenuItem value={value} key={label}>
            {label}
          </MenuItem>
        ))}
      </TextField> */}

      {/* ZIP-CODE TEXT FIELD */}
      {/* <TextField
        fullWidth
        size="small"
        label="Zip Code"
        placeholder="3100"
        variant="outlined"
        sx={{ mt: 2 }}
      />

      <Button variant="outlined" color="primary" fullWidth sx={{ my: 2 }}>
        Calculate Shipping
      </Button> */}

      <Button
        fullWidth
        color="primary"
        disabled={cart.cartItems.length < 1}
        onClick={navigateCheckout}
        variant="contained"
        LinkComponent={Link}
      >
        Checkout Now
      </Button>
    </Card>
  );
};

export default CheckoutForm;
