export interface MainCarouselItem {
  title?: string;
  imgUrl?: string;
  category?: string;
  discount?: number;
  buttonLink?: string;
  buttonText?: string;
  description?: string;
}

export interface CategoryList {
  category: {id:string; title: string; children: any};
}
