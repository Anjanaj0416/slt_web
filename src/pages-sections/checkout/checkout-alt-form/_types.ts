export interface Address {
  id: number;
  name: string,
  addressLine1: string,
  addressLine2: string,
  postalCode: string,
  provinceOrState: string,
  contactNumber: string,
  primary: boolean,
}

export interface InitialValues {
  card: string;
  date: string;
  time: string;
  address: string;
  voucher: string;
  cardCVC: string;
  cardYear: string;
  cardMonth: string;
  cardNumber: string;
  cardHolderName: string;
}
