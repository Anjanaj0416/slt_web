import User, { User1 } from "./User.model";
import Product, { Product1 } from "./Product.model";

interface Review {
  id: string;
  rating: number;
  customer: User;
  comment: string;
  product: Product;
  published?: boolean;
}

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

export default Review;
