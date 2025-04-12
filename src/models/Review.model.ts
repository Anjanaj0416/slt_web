import User, { User1 } from "./User.model";
import { Product1 } from "./Product.model";

export interface Review1 {
  id: string;
  rating: number;
  user: User1;
  text: string;
  product: Product1;
  createdAt: Date;
}

export interface POSTReviewRequest {
  rating: number;
  text: string;
  productId: string;
}
