import { Metadata } from "next";
import { notFound } from "next/navigation";
// PAGE VIEW COMPONENT
import { ProductDetailsPageView } from "pages-sections/product-details/page-view";
import { cachedRequest } from "utils/request";
import PRODUCT_API from "constants/products";
import STORE_API from "constants/store";
import { Product1 } from "models/Product.model";
import Store from "models/Store.model";

export const metadata: Metadata = {
  title: "Product Details - TRADEZ ",
  description: `TRADEZ is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,

  viewport: "width=device-width, initial-scale=1",
  keywords: ["Tradez"],
};

export default async function ProductDetails({ params }) {
  try {
    const idAndName = params?.id?.split("_");
    console.log(idAndName);
    
   
    const productId = idAndName?.[0];
    // 1. Fetch product
    const [productResults, ownerStoreResult] = await Promise.all([
      cachedRequest(PRODUCT_API.GET_PRODUCTS, {
        query: `productId=${productId}`,
      }),
      cachedRequest(STORE_API.GET_STORES, {
        query: `productId=${productId}&size=1`,
      }),
    ]);
    const product = productResults?.data?.[0] as Product1;

   

    const ownerStore = ownerStoreResult?.data?.[0] as Store | undefined;
    let availableStores: Store[] = [];
    if (product.tags?.length > 0) {
      let storesResult = await cachedRequest(STORE_API.GET_STORES, {
          query: `size=4`,
        }),
        availableStores = (storesResult?.data ?? []) as Store[];

      if (availableStores.length > 0 && ownerStore) {
        availableStores = availableStores
          .filter((store) => store.id !== ownerStore.id)
          .slice(0, 3);
      }
    }
    return (
      <ProductDetailsPageView
        product={product}
        ownerStore={ownerStore}
        stores={availableStores}
      />
    );
  } catch (error) {
    console.log(error);
  }
}
