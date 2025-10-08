import { Metadata } from "next";
// PAGE VIEW COMPONENT
import { ProductSearchPageView } from "pages-sections/product-details/page-view";
import { cachedRequest } from "utils/request";
import PRODUCT_API from "constants/products";
import { notFound } from "next/navigation";
import BANNER_API from "constants/banners";

export const metadata: Metadata = {
  title: "Product Search - TRADEZ ",
  viewport: "width=device-width, initial-scale=1",
};

export default async function ProductSearch({ params, searchParams }) {
  try {
    const slug = params.slug.replace(/%20/g, " ");
    const categoryId = searchParams?.categoryId;
    const [result, banners] = await Promise.all([
      cachedRequest(PRODUCT_API.GET_PRODUCTS, {
        query: categoryId
          ? `size=9&name=${slug}&categoryId=${categoryId}`
          : `size=9&name=${slug}`,
      }),
      cachedRequest(BANNER_API.GET_BANNERS, {
        query: "size=6&bannerType=SEARCH_SECTION_CAROUSEL",
      }),
    ]);

    //
    return (
      <ProductSearchPageView
        searchText={slug}
        products={result?.data}
        categoryId={categoryId}
        totalResults={result?.totalResults}
        initTotalPages={result?.totalPages}
        banners={banners?.data}
      />
    );
  } catch (error) {
    console.error(error);
    notFound();
  }
}
