import Button from "@mui/material/Button";
import { Box, styled } from "@mui/material";
import { ENVIRONMENT } from "config";
import Image from "next/image";
import { FlexBox } from "components/flex-box";

// Styled Button with props for the selected state
const PaymentButton = styled(Button)<{ selected: boolean }>(
  ({ theme, selected }) => ({
    backgroundColor: selected
      ? theme.palette.primary.main
      : theme.palette.grey[300],
    color: selected ? "#fff" : theme.palette.text.primary,
    "&:hover": {
      backgroundColor: selected
        ? theme.palette.primary.dark
        : theme.palette.grey[400],
    },
  })
);
export type CardType = "VISA_MASTER" | "AMEX";
type Props = {
  selectedCardType: CardType;
  setCardType: (value: CardType) => void;
  disabled?: boolean;
};
const CreditCardButton = ({
  setCardType,
  selectedCardType,
  disabled = false,
}: Props) => {
  const handleSelect = (payment: CardType) => {
    setCardType(payment);
  };

  return (
    <FlexBox gap={2}>
      <PaymentButton
        selected={selectedCardType === "VISA_MASTER"}
        onClick={() => handleSelect("VISA_MASTER")}
        disabled={disabled}
      >
        <Image
          src={`${ENVIRONMENT.APP_URL}/assets/images/visa_master.png`}
          alt="Visa Logo"
          width={80}
          height={30}
        />
      </PaymentButton>
      <PaymentButton
        selected={selectedCardType === "AMEX"}
        onClick={() => handleSelect("AMEX")}
        disabled={disabled}
      >
        <Image
          src={`${ENVIRONMENT.APP_URL}/assets/images/amex.png`}
          alt="Visa Logo"
          width={90}
          height={40}
        />
      </PaymentButton>
    </FlexBox>
  );
};

export default CreditCardButton;
