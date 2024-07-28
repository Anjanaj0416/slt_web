export type PackageStatus =
  | "PENDING"
  | "PROCESSING"
  | "DELIVERED"
  | "CANCELLED";
export type PackageItem = {
  id: string;
  status: PackageStatus;
  product: any;
  discount: number;
  price: number;
  units: number;
};

interface Package {
  id: string;
  status: PackageStatus;
  packageItems: PackageItem[];
  createdAt: Date;
}

export default Package;
