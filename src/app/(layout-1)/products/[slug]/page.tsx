import { Metadata } from "next";
import { notFound } from "next/navigation";
// PAGE VIEW COMPONENT
import { ProductDetailsPageView } from "pages-sections/product-details/page-view";
// API FUNCTIONS
import api from "utils/__api__/products";
import { getFrequentlyBought, getRelatedProducts } from "utils/__api__/related-products";

export const metadata: Metadata = {
  title: "Product Details - Next.js E-commerce Template",
  description: "Bazaar Product Details Page View",
};

export default async function ProductDetails({ params }) {
  try {
    const product = await api.getProduct(params.slug as string);
    const relatedProducts = await getRelatedProducts();
    const frequentlyBought = await getFrequentlyBought();

    return (
      <ProductDetailsPageView
        product={product}
        relatedProducts={relatedProducts}
        frequentlyBought={frequentlyBought}
      />
    );
  } catch (error) {
    notFound();
  }
}
