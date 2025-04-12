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
  city: string;
  createdAt: Date;
  lastUpdatedAt: Date;
  primary: boolean;
}

export interface POSTAddressRequest {
  addressType: "BILLING" | "SHIPPING";
  name: string;
  addressLine1: string;
  addressLine2: string;
  postalCode: string;
  country: string;
  provinceOrState: string;
  contactNumber: string;
  primary: boolean;
}
