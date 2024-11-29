import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import { ChangeEvent, Fragment, useEffect, useState } from "react";
import FormLabel from "./form-label";
import { useCreateOrderMutation } from "services/order-api";
import useCheckoutService from "hooks/useCheckoutService";
import useCartService from "hooks/useCartService";
import { useSession } from "next-auth/react";
import { User1 } from "models/User.model";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import CreditCardButton, { CardType } from "./credit-card-buttons";
import { LoadingButton } from "@mui/lab";

const PAYMENT_METHODS = {
  CASH_ON_DELIVERY: "COD",
  CARD: "CARD",
} as const;

const PaymentForm = () => {
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { data: session } = useSession();
  const user = session?.user as User1;
  const { selectedBillingAddressId, selectedShippingAddressId } =
    useCheckoutService();
  const { note, totalPrice, setCart } = useCartService();
  const [selectedCard, setSelectedCard] = useState<CardType>();

  //
  const [createOrder, { isLoading: isCreatingOrder, isSuccess, data }] =
    useCreateOrderMutation();
  //
  useEffect(() => {
    if (isSuccess && paymentMethod === PAYMENT_METHODS.CASH_ON_DELIVERY) {
      enqueueSnackbar("Order places successfully", { variant: "success" });
      setCart({ id: "", cartItems: [] });

      push(`/orders/${data.id}`);
    }
  }, [isCreatingOrder, isSuccess]);

  function submitDataToIpg(redirectUrl: string, data: Record<string, string>) {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = redirectUrl;
    form.enctype = "application/x-www-form-urlencoded";

    for (const [key, value] of Object.entries(data)) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value;
      form.appendChild(input);
    }

    document.body.appendChild(form);

    form.submit();
  }
  //
  const [paymentMethod, setPaymentMethod] = useState<string>(
    PAYMENT_METHODS.CARD
  );
  //
  const handlePaymentMethodChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(event.target.name);
  };
  //
  const placeOrder = async () => {
    let ipgType: string;

    if (paymentMethod === PAYMENT_METHODS.CASH_ON_DELIVERY) {
      ipgType = "NONE";
    } else if (selectedCard === "VISA_MASTER") {
      ipgType = "NDB";
    } else if (selectedCard === "AMEX") {
      ipgType = "WEBX_PAY";
    } else {
      enqueueSnackbar("Select Card Type", { variant: "warning" });
      return;
    }
    const orderData = await createOrder({
      body: {
        cartId: user?.cart?.id,
        userId: user?.id,
        shippingAddressId: selectedShippingAddressId,
        billingAddressId: selectedBillingAddressId,
        note,

        payments: [
          {
            amount: totalPrice,
            paymentType: paymentMethod,
            ipgType,
          },
        ],
      },
    });

    if (paymentMethod !== PAYMENT_METHODS.CASH_ON_DELIVERY) {
      const order = (orderData as any).data;
      const paymentIntDto =
        ipgType === "NDB" ? order.ndbPaymentIntDto : order.webXPayPaymentIntDto;
      const { redirectUrl, ...formData } = paymentIntDto;
      submitDataToIpg(redirectUrl, formData);
    }
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
        <FormLabel
          name={PAYMENT_METHODS.CARD}
          title="Pay with Card"
          handleChange={handlePaymentMethodChange}
          checked={paymentMethod === PAYMENT_METHODS.CARD}
        />

        {paymentMethod === PAYMENT_METHODS.CARD && (
          <CreditCardButton
            selectedCardType={selectedCard}
            setCardType={setSelectedCard}
          />
        )}

        <Divider sx={{ my: 3, mx: -4 }} />

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

        <LoadingButton
          loading={isCreatingOrder}
          disabled={isCreatingOrder || isSuccess}
          LinkComponent={Link}
          variant="contained"
          color="primary"
          onClick={placeOrder}
          type="submit"
          fullWidth
        >
          Place Order
        </LoadingButton>
      </Stack>
    </Fragment>
  );
};

export default PaymentForm;
