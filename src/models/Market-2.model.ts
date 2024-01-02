import Category1 from "./Category.model";

export interface MainCarouselItem {
  title?: string;
  imgUrl?: string;
  category?: string;
  discount?: number;
  buttonLink?: string;
  buttonText?: string;
  description?: string;
}
