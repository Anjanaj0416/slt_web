import { Metadata } from "next";
import { notFound } from "next/navigation";
// PAGE VIEW COMPONENT
import { ProductDetailsPageView } from "pages-sections/product-details/page-view";
import request from "utils/request";
import PRODUCT_API from "constants/products";
import STORE_API from "constants/store";
import { Product1 } from "models/Product.model";
import Store from "models/Store.model";

export const metadata: Metadata = {
  title: "Product Details - TRADEZ ",
  description: `TRADEZ is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [{ name: "UI-LIB", url: "https://ui-lib.com" }],
  viewport: "width=device-width, initial-scale=1",
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};

export default async function ProductDetails({ params }) {
  try {
    const productResults = await request(PRODUCT_API.GET_PRODUCTS, {
      query: `productId=${params?.id}`,
    });
    const product = productResults?.data?.[0] as Product1;
    let availableStores =
      product?.tags?.length < 1
        ? []
        : ((
            await request(STORE_API.GET_STORES, {
              query: `size=4`,
            })
          )?.data as Store[]);
    const ownerStoreResult = await request(STORE_API.GET_STORES, {
      query: `productId=${params?.id}&size=1`,
    });
    const ownerStore = ownerStoreResult?.data?.[0] as Store;
    if (availableStores.length > 0 && ownerStore) {
      availableStores = availableStores
        .filter((store) => store.id != ownerStore.id)
        .slice(0, 3);
    }

    let relatedProducts = (
      await request(PRODUCT_API.GET_PRODUCTS, {
        query: `categoryId=${product?.category.id}&size=5`,
      })
    )?.data as Product1[];

    if (product && relatedProducts?.length > 0) {
      relatedProducts = relatedProducts
        .filter((p) => p.id != product.id)
        .slice(0, 4);
    }

    return (
      <ProductDetailsPageView
        product={product}
        relatedProducts={relatedProducts}
        ownerStore={ownerStore}
        stores={availableStores}
      />
    );
  } catch (error) {
    console.log(error);
    notFound();
  }
}
