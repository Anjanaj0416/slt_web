import { Metadata } from "next";
// PAGE VIEW COMPONENT
import { ProductSearchPageView } from "pages-sections/product-details/page-view";
import { cachedRequest } from "utils/request";
import PRODUCT_API from "constants/products";
import BANNER_API from "constants/banners";
import { notFound } from "next/navigation";
import { Product1 } from "models/Product.model";

export const metadata: Metadata = {
  title: "Product Search - TRADEZ ",

  viewport: "width=device-width, initial-scale=1",
};

export default async function ProductSearch({ searchParams }) {
  try {
    const categoryId = searchParams?.categoryId?.split("_")?.[0];
    const [result, banners] = await Promise.all([
      cachedRequest(PRODUCT_API.GET_PRODUCTS, {
        query: `size=12&categoryId=${categoryId}`,
      }),
      cachedRequest(BANNER_API.GET_BANNERS, {
        query: "size=6&bannerType=SEARCH_SECTION_CAROUSEL",
      }),
    ]);

    const products = result?.data as Product1[];

    const searchText =
      products?.[0]?.category.id === categoryId
        ? products?.[0]?.category.name
        : products?.[0]?.category?.subCategories?.find(
            (e) => e.id === categoryId
          ).name;

    return (
      <ProductSearchPageView
        banners={banners?.data}
        searchText={searchText}
        products={products}
        categorySelect
        categoryId={categoryId}
        totalResults={result?.totalResults}
        initTotalPages={result?.totalPages}
      />
    );
  } catch (error) {
    console.log(error);
    notFound();
  }
}
