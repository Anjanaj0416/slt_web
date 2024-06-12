import { Metadata } from "next";
import { notFound } from "next/navigation";
// PAGE VIEW COMPONENT
import { ProductDetailsPageView } from "pages-sections/product-details/page-view";
import request from "utils/request";
import PRODUCT_API from "constants/products";
import STORE_API from "constants/store";

export const metadata: Metadata = {
  title: "Product Details - Bazaar Next.js E-commerce Template",
  description: `Bazaar is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [{ name: "UI-LIB", url: "https://ui-lib.com" }],
  viewport: "width=device-width, initial-scale=1",
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};

export default async function ProductDetails({ params }) {
  try {
    //const frequentlyBought = await getFrequentlyBought();
    const products = await request(PRODUCT_API.GET_PRODUCTS, {
      query: `productId=${params?.id}`,
    });

    const stores = await request(STORE_API.GET_STORES, {
      query: `size=3`,
    });

    const relatedProducts = await request(PRODUCT_API.GET_PRODUCTS, {
      query: `categoryId=${products?.data[0]?.category.id}&size=4`,
    });

    return (
      <ProductDetailsPageView
        product={products?.data[0]}
        relatedProducts={relatedProducts?.data}
        //frequentlyBought={frequentlyBought}
        stores={stores.data}
      />
    );
  } catch (error) {
    console.log(error);

    notFound();
  }
}
