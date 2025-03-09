import { Metadata } from "next";
// PAGE VIEW COMPONENT
import { ProductSearchPageView } from "pages-sections/product-details/page-view";
import request from "utils/request";
import PRODUCT_API from "constants/products";
import { notFound, redirect } from "next/navigation";
import { Product1 } from "models/Product.model";

export const metadata: Metadata = {
  title: "Product Search - TRADEZ ",
  description: `TRADEZ is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [{ name: "UI-LIB", url: "https://ui-lib.com" }],
  viewport: "width=device-width, initial-scale=1",
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};

export default async function ProductSearch({ searchParams }) {
  try {
    const categoryId = searchParams?.categoryId;
    // if (!categoryId) {
    //   redirect("/");
    // }

    const result = await request(PRODUCT_API.GET_PRODUCTS, {
      query: `size=9&categoryId=${categoryId}`,
    });

    const products = result?.data as Product1[];
    if (products.length < 1) {
      //notFound();
    }
    console.log(products);

    const searchText =
      products?.[0]?.category.id === categoryId
        ? products?.[0]?.category.name
        : products?.[0]?.category?.subCategories?.find(
            (e) => e.id === categoryId
          ).name;

    return (
      <ProductSearchPageView
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
