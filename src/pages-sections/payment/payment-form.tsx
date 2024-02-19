import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import { ChangeEvent, Fragment, useState } from "react";
import FormLabel from "./form-label";
import { useCreateOrderMutation } from "services/order-api";
import useCheckoutService from "hooks/useCheckoutService";
import useCartService from "hooks/useCartService";
import { useSession } from "next-auth/react";
import { User1 } from "models/User.model";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";

const PAYMENT_METHODS = {
  CASH_ON_DELIVERY: "cash-on-deliver",
} as const;

const PaymentForm = () => {
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { data: session } = useSession();
  const user = session?.user as User1;
  const { selectedBillingAddressId, selectedShippingAddressId } =
    useCheckoutService();
  const { note, totalPrice } = useCartService();
  //
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  //
  const [paymentMethod, setPaymentMethod] = useState<string>(
    PAYMENT_METHODS.CASH_ON_DELIVERY
  );
  //
  const handlePaymentMethodChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(event.target.name);
  };
  //
  const placeOrder = async () => {
    await createOrder({
      body: {
        cartId: user?.cart?.id,
        userId: user?.id,
        shippingAddressId: selectedShippingAddressId,
        billingAddressId: selectedBillingAddressId,
        note,
        payments: [{ amount: totalPrice, paymentType: "COD" }],
      },
    });
    enqueueSnackbar("Order places successfully", { variant: "success" });
    push("/orders");
  };

  return (
    <Fragment>
      <Card
        sx={{
          paddingInline: { sm: 3, xs: 2 },
          paddingBottom: { sm: 3, xs: 2 },
          mb: 4,
        }}
      >
        {/* CREDIT CARD OPTION */}
        {/* <FormLabel
          name="credit-card"
          title="Pay with credit card"
          handleChange={handlePaymentMethodChange}
          checked={paymentMethod === "credit-card"}
        />

        {paymentMethod === "credit-card" && <CreditCardForm />}

        <Divider sx={{ my: 3, mx: -4 }} /> */}

        {/* PAYPAL CARD OPTION */}
        {/* <FormLabel
          name="paypal"
          title="Pay with Paypal"
          handleChange={handlePaymentMethodChange}
          checked={paymentMethod === "paypal"}
        /> */}

        {/* {paymentMethod === "paypal" && (
          <FlexBox alignItems="flex-end" gap={2} mb={4}>
            <TextField
              fullWidth
              name="email"
              type="email"
              label="Paypal Email"
            />
            <Button variant="outlined" color="primary" type="button">
              Submit
            </Button>
          </FlexBox>
        )} */}

        <Divider sx={{ mt: 3, mx: -4 }} />

        {/* CASH ON DELIVERY OPTION */}
        <FormLabel
          name={PAYMENT_METHODS.CASH_ON_DELIVERY}
          title="Cash On Delivery"
          handleChange={handlePaymentMethodChange}
          checked={paymentMethod === PAYMENT_METHODS.CASH_ON_DELIVERY}
        />
      </Card>

      {/* BUTTONS SECTION */}
      <Stack direction="row" spacing={3}>
        <Button
          LinkComponent={Link}
          href="/checkout"
          variant="outlined"
          color="primary"
          type="button"
          fullWidth
        >
          Back to checkout
        </Button>

        <Button
          LinkComponent={Link}
          variant="contained"
          color="primary"
          onClick={placeOrder}
          type="submit"
          fullWidth
        >
          Place Order
        </Button>
      </Stack>
    </Fragment>
  );
};

export default PaymentForm;
