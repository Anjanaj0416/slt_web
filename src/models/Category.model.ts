interface Category1 {
  id: string;
  name: string;
  imageUrl?: string;
  parentCategory: Category1;
  subCategories: Category1[];
  isFeatured?: boolean;
}

export default Category1;
