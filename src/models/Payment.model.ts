export default interface Payment {
  id: string;
  paymentNumber: string;
  amount: number;
  paymentType: "COD" | "CARD";
  paymentStatus: "FAIL" | "SUCCESS" | "PENDING";
  createdAt: string;
  lastUpdatedAt: string;
}
