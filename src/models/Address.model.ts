import User from "./User.model";

interface Address {
  id: string;
  user: User;
  city: string;
  title: string;
  phone: string;
  street: string;
  country: string;
}

export default Address;

export interface POSTAddressResponse {
  id: string;
  addressType: "BILLING" | "SHIPPING";
  name: string;
  addressLine1: string;
  addressLine2: string;
  postalCode: string;
  country: string;
  provinceOrState: string;
  contactNumber: string;
  createdAt: Date;
  lastUpdatedAt: Date;
}