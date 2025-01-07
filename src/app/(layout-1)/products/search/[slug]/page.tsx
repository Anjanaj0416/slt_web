import { Metadata } from "next";
// PAGE VIEW COMPONENT
import { ProductSearchPageView } from "pages-sections/product-details/page-view";
import request from "utils/request";
import PRODUCT_API from "constants/products";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Product Search - TRADEZ ",
  description: `TRADEZ is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [{ name: "UI-LIB", url: "https://ui-lib.com" }],
  viewport: "width=device-width, initial-scale=1",
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};

export default async function ProductSearch({ params, searchParams }) {
  try {
    const slug = params.slug.replace(/%20/g, " ");
    const categoryId = searchParams?.categoryId;
    const result = await request(PRODUCT_API.GET_PRODUCTS, {
      query: categoryId
        ? `size=9&name=${slug}&categoryId=${categoryId}`
        : `size=9&name=${slug}`,
    });
    //
    return (
      <ProductSearchPageView
        searchText={slug}
        products={result?.data}
        categoryId={categoryId}
        totalResults={result?.totalResults}
        initTotalPages={result?.totalPages}
      />
    );
  } catch (error) {
    notFound();
  }
}
