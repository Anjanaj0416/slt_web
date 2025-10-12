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
import { useState } from "react";
import { useSnackbar } from "notistack";
import { useCalculateVoucherDiscountMutation } from "services/voucher-api";
import { useSession } from "next-auth/react";
import { LoadingButton } from "@mui/lab";

const CheckoutForm = () => {
  const { push } = useRouter();
  const [comments, setComments] = useState("");
  const { data } = useSession();
  const {
    totalDiscount,
    totalPrice,
    setNote,
    cart,
    increaseVoucherDiscount,
    removeVoucherDiscount,
  } = useCartService();
  const { enqueueSnackbar } = useSnackbar();
  const [appliedVoucher, setAppliedVoucher] = useState<string>();
  const [voucherCode, setVoucherCode] = useState<string>("");
  const [calculateVoucherDiscount, { isLoading }] =
    useCalculateVoucherDiscountMutation();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVoucherCode(event.target.value); // Update the state with the input's value
  };
  const user = data?.user;
  const handleAddVoucher = async () => {
    if (voucherCode.length !== 6) {
      enqueueSnackbar("Invalid Voucher!", {
        variant: "error",
      });
      setVoucherCode("");
      return;
    }
    const productVariantIDAndUnits = cart.cartItems.map(
      ({ productVariant, units }) => ({
        productVariantId: productVariant.id,
        units,
      })
    );
    const body = {
      userId: (user as any)?.id,
      voucherCode,
      productVariantIDAndUnits,
    };

    calculateVoucherDiscount({ body }).then((response) => {
      const discount = (response as any)?.data?.discount;
      const discountedProductVariant = (response as any)?.data
        ?.discountedProductVariant;
      if (discount && discountedProductVariant) {
        try {
          increaseVoucherDiscount(
            voucherCode,
            discountedProductVariant.id,
            discount
          );
          enqueueSnackbar(
            `Voucher applied. LKR${discount} has been deducted from the total price!`,
            {
              variant: "success",
            }
          );
          setAppliedVoucher(voucherCode);
        } catch {
          enqueueSnackbar("This voucher already use in this order!", {
            variant: "error",
          });
        } finally {
          setVoucherCode("");
        }
      }
    });
  };
  const handleVoucherRemove = () => {
    removeVoucherDiscount(appliedVoucher);
    setAppliedVoucher(null);
  };
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
      {appliedVoucher ? (
        <FlexBetween
          mb={2}
          p={1}
          sx={{ bgcolor: "primary.light", borderRadius: "6px" }}
        >
          <Span fontWeight={600}>Voucher Applied: {appliedVoucher}</Span>
          <Button size="small" color="error" onClick={handleVoucherRemove}>
            Remove
          </Button>
        </FlexBetween>
      ) : (
        <>
          <TextField
            fullWidth
            disabled={cart.cartItems.length < 1}
            size="small"
            label={voucherCode ? "Voucher" : ""}
            variant="outlined"
            placeholder="Enter Voucher Code"
            value={voucherCode}
            onChange={handleChange}
          />
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            disabled={cart.cartItems.length < 1 || !voucherCode || isLoading}
            sx={{ mt: 2, mb: 4 }}
            onClick={handleAddVoucher}
          >
            Apply Voucher
          </Button>
        </>
      )}

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
