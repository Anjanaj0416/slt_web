import Category1 from "./Category.model";
import SocialLink from "./SocialLink.model";

export default interface Store {
  id: string;
  socialLinks?: SocialLink[];
  name: string;
  description: string;
  category: Category1;
  telephone?: string;
  fax?: string;
  whatsapp?: string;
  address?: string;
  email: string;
  district: string;
  website?: string;
  logoFilePath: string;
  storeStatus: StoreStatus;
  coverImageFilePath: string;
  createdAt?: Date;
  lastUpdatedAt?: Date;
}

export type StoreStatus = "IN_REVIEW" | "PUBLISHED" | "UNPUBLISHED";
