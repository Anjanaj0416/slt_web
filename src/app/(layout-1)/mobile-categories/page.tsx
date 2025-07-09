import CATEGORY_API from "constants/categories";
import { notFound } from "next/navigation";
import MobileCategoryPageView from "pages-sections/mobile-category/mobile-category";
import { cachedRequest } from "utils/request";

export default async function MobileCategories() {
  try {
    const categories = await cachedRequest(CATEGORY_API.GET_CATEGORIES, {
      query:
        "size=12&categoryType=PRODUCT&categoryStatus=APPROVED&parentCategoryId=null",
    });
    return <MobileCategoryPageView categories={categories?.data} />;
  } catch {
    notFound();
  }
}
